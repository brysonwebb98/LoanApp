import { body } from "express-validator";

export const registrationValidation = [

    body('username')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Username must be between 3 and 50 characters'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Must be a valid email address')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),

    body('confirm_password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords must match");
            }
            return true;
        })
];
