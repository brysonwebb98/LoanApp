# Loan Application System

## Website URL
https://loanapp-iwjz.onrender.com/

## Website GitHub
https://github.com/brysonwebb98/LoanApp

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

## Project Goals

- Build a secure server-side application
- Implement MVC architecture
- Use PostgreSQL for persistent data storage
- Apply middleware for authentication and authorization
- Follow backend development best practices