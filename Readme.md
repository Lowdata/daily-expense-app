# Daily Expense App

## Quick Description

The Daily Expense App is a backend service that handles user authentication and authorization using JWT. It allows users to register, login, and access protected routes. The app is built using TypeScript, Express.js, and various other libraries for handling security and hashing.

## Branches

### Master Branch
- **Description**: Contains all features fully integrated.

## Features

### Authentication & Authorization
- **User Registration**: Allows users to create an account.
- **User Login**: Authenticates users and provides a JWT.
- **Protected Routes**: Access to protected routes using JWT.

### Expense Management
- **Add Expenses**: Users can add new expenses with options to split the amount equally, by percentage, or with exact amounts.
- **Retrieve Individual User Expenses**: Fetch expenses associated with a specific user.
- **Retrieve Overall Expenses**: Fetch all expenses.
- **Download Balance Sheet**: Generate and download a balance sheet showing the amounts owed by and to each user.

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

### Register User

- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }

### add expenses

- **URL**: expenses/add
- **Method**: POST
- **Header**: Authorisation: Bearer 'your_token'
  #### Example Body
  
```json
    {
  "amount": 100,
  "splitMethod": "equal",
  "participants": [
    {
      "userId": "user1"
    },
    {
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]}
```
### Login User

- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
```
    
### Retrieve individual user expenses.

- **URL**: expenses/user
- **Method**: GET
- **Header**: Authorisation: Bearer 'your_token'


### Retrieve overall expenses.

- **URL**: expenses/overall
- **Method**: GET
- **Header**: Authorisation: Bearer 'your_token'



### Get balance sheet.

- **URL**: expenses/balance-sheet
- **Method**: GET
- **Header**: Authorisation: Bearer 'your_token'
