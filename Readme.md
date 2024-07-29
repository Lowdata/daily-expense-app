# Daily Expense App

## Quick Description

The Daily Expense App is a backend service that handles user authentication and authorization using JWT. It allows users to register, login, and access protected routes. The app is built using TypeScript, Express.js, and various other libraries for handling security and hashing.

## Branches

### Master Branch: Contains all features fully integrated.
Feature Branches: Each feature is implemented in its own branch for easier review and version control.
Branch Name : jwt-awth



## Features of Branch Name : user-features

- Fetch user details protected

## Installation

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
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

### Access user data Endpoint

- **URL**: `auth/user`
- **Method**: `GET`
- **Header**: Bearer 'your_token'
    


