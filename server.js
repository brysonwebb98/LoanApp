// Main Dependencies
import "dotenv/config";
import express from "express";
import session from "express-session";
import path from 'path';
import { fileURLToPath } from 'url';
import { setHeadAssetsFunctionality, getCurrentGreeting } from "./src/middleware/global.js";
import { setupDatabase, testConnection } from './src/models/setup.js';
import connectPgSimple from "connect-pg-simple";
import { caCert } from "./src/models/db.js";

// MVC Components
import routes from './src/controllers/routes.js';

// Server Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

const PORT = process.env.PORT || 3000;

// Express Setup
const app = express();

// Initialize PostgreSQL session store
const pgSession = connectPgSimple(session);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    store: new pgSession({
        conObject: {
            connectionString: process.env.DB_URL,
            // Configure SSL for session store connection (required by BYU-I databases)
            ssl: {
                ca: caCert,
                rejectUnauthorized: true,
                checkServerIdentity: () => { return undefined; }
            }
        },
        tableName: 'session',
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: NODE_ENV.includes('dev') !== true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

import flash from './src/middleware/flash.js';

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use((req, res, next) => {
    setHeadAssetsFunctionality(res);
    res.locals.currentYear = new Date().getFullYear();
    res.locals.greeting = getCurrentGreeting();
    res.locals.user_id = req.session.user_id || null;
    res.locals.role = req.session.role || null;
    next();
})

// FLASH MIDDLEWARE
app.use(flash);

// Routes
app.use('/', routes);

// Error Handling
// 404 Handler
app.use((req, res, next) => {
    console.log("404 REQUEST:", req.method, req.originalUrl);
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR:", err);
    
    // Preventing infinate loops, if a response has already been sent, do nothing
    if (res.headersSent || res.finished) {
        return next(err);
    }

    // Figure out status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    // Prepare data for template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: NODE_ENV === 'production' ? 'An error occurred' : err.message,
        stack: NODE_ENV === 'production' ? null : err.stack,
        NODE_ENV
    };

    try {
        res.status(status).render(`errors/${template}`, context);
    }
    catch (renderErr) {
        if (!res.headersSent) {
            res.status(status).send(`<h1>Error ${status}</h1><p>An error occurred.</p>`);
        }
    }
});

// Start Server
app.listen(PORT, async () => {
    await setupDatabase();
    await testConnection();
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});