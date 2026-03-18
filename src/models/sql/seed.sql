-- Database seed file for LoanApp
-- This file creates tables and inserts initial test data

BEGIN;

-- Drop existing tables 
DROP TABLE IF EXISTS debts CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'applicant',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create applications table
CREATE TABLE applications (
    application_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,

    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    dob DATE NOT NULL,
    ssn_last4 CHAR(4) NOT NULL,

    address VARCHAR(150) NOT NULL,
    time_at_address_years INTEGER NOT NULL,
    address_type VARCHAR(50) NOT NULL,
    housing_payment NUMERIC(10,2) NOT NULL,

    employer_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    pay_type VARCHAR(10) NOT NULL,
    income_amount NUMERIC(10,2) NOT NULL,

    loan_type VARCHAR(50) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    term INTEGER NOT NULL,

    status VARCHAR(20) DEFAULT 'submitted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create debts table
CREATE TABLE debts (
    debt_id SERIAL PRIMARY KEY,
    application_id INTEGER NOT NULL,

    debt_type VARCHAR(50) NOT NULL,
    creditor_name VARCHAR(100),
    monthly_payment NUMERIC(10,2) NOT NULL DEFAULT 0,
    balance_outstanding NUMERIC(10,2) NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (application_id) REFERENCES applications(application_id) ON DELETE CASCADE
);

-- Insert test users
INSERT INTO users (username, email, password_hash, role) VALUES
('testuser', 'testuser@example.com', 'password_hash_placeholder', 'applicant');

-- Insert test application
INSERT INTO applications (
    user_id,
    first_name,
    last_name,
    dob,
    ssn_last4,
    address,
    address_type,
    time_at_address_years,
    housing_payment,
    employer_name,
    job_title,
    pay_type,
    income_amount,
    loan_type,
    amount,
    term,
    status
) VALUES
(
    1,
    'Test',
    'Applicant',
    '1998-01-01',
    '1234',
    '123 Main St, Rexburg, ID 83440',
    'rent',
    2,
    1200.00,
    'Example Company',
    'Clerk',
    'hourly',
    3200.00,
    'personal',
    5000.00,
    36,
    'submitted'
);

-- Insert test debts
INSERT INTO debts (
    application_id,
    debt_type,
    creditor_name,
    monthly_payment,
    balance_outstanding
) VALUES
(1, 'credit_card', 'Chase', 75.00, 1200.00),
(1, 'auto_loan', 'Toyota Financial', 320.00, 8900.00);

COMMIT;