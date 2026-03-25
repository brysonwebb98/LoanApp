# Loan Application System

## Project Overview
This application is a server-side web system that allows users to submit loan applications and track their approval status. The system also provides access for credit managers to review, approve, or deny submitted applications.

---

## Application Structure

### User Features
- Users can create an account and log in securely
- After logging in, users can submit a loan application
- Users can view their application status
  - Pending
  - Approved
  - Denied

### Credit Manager Features
- Credit managers can log in to a secure dashboard
- Managers can view submitted loan applications
- Managers can approve or deny applications
- Application decisions are saved and visible to the user

### Admin Features
- View all registered users and their roles
- Update user roles
- Delete users from the system

---

## MVC Architecture

This project follows the **Model-View-Controller (MVC)** design pattern to maintain a clean and organized structure.

- **Models**
  - Handle database interactions
  - Manage user data, loan data, and application status

- **Views**
  - Display user interfaces
  - Render pages for login, application submission, dashboards, and status views

- **Controllers**
  - Handle application logic
  - Process user requests
  - Connect models and views

This structure helps separate concerns and improves maintainability and scalability.

---

## PostgreSQL Database

The application uses a **PostgreSQL** database to store all system data, including:

- User account information
- Loan application details
- Approval status and manager decisions

### Security
- Parameterized SQL queries will be used to prevent **SQL injection**
- Database interactions will follow best practices for secure data handling

---

## Middleware

Middleware will be used to improve security and control access within the application.

Middleware responsibilities include:

- Authentication (ensuring users are logged in)
- Authorization (restricting manager-only areas)
- Session management
- Protecting sensitive routes and data

This ensures that only authorized users can access protected parts of the system.

--- 

## Authentication, Authorization, and Flash Messages

This application uses **session-based authentication** to verify user identity.  
After a successful login, the user's `user_id` and `role` are stored in the session, allowing secure access to protected routes.

**Authorization** is handled through role-based middleware that controls what each user can do:

- Applicants can submit loan applications and view their status  
- Credit managers can review, approve, or deny applications  
- Admins can manage system-level features of updating users roles or deleting users

If a user attempts to access a restricted route, they are redirected and shown an appropriate message.

The system also uses **flash messages** to provide feedback after important actions such as login attempts, application submission, or loan decision updates.  
Flash messages are temporarily stored in the session (`req.session`) and displayed on the next page load, then automatically cleared.

--- 

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- EJS templating
- Session-based authentication
- MVC architecture
- Render deployment platform

---

## Project Goals

- Build a secure server-side application
- Implement MVC architecture
- Use PostgreSQL for persistent data storage
- Apply middleware for authentication and authorization
- Follow backend development best practices

---

## Website GitHub
https://github.com/brysonwebb98/LoanApp

--- 

## Website URL
https://loanapp-iwjz.onrender.com/

### Test Login Credentials

| Role      | Username  | Password |
|-----------|-----------|----------|
| Applicant | applicant | Test1234! |
| Credit    | credit    | Test1234! |
| Admin     | admin     | Test1234! |