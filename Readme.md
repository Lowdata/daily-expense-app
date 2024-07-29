# Daily Expense App

## Quick Description

The Daily Expense App is a backend service that handles user authentication and authorization using JWT. It allows users to register, login, and access protected routes. The app is built using TypeScript, Express.js, and various other libraries for handling security and hashing.

## Features

- User Registration
- User Login
- Protected Routes
- JWT Authentication
- Password Hashing with bcrypt

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/daily-expense-app.git
    cd daily-expense-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env` file in the root directory and add your JWT secret**:
    ```env
    JWT_SECRET=your_secret_key
    ```

4. **Run the application**:
    ```bash
    npm run dev
    ```

## API Endpoints

### Register User

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }
