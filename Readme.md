# Daily Expense App

## Quick Description

The Daily Expense App is a backend service that handles user authentication and authorization using JWT. It allows users to register, login, and access protected routes. The app is built using TypeScript, Express.js, and various other libraries for handling security and hashing.

## Branches

### Master Branch: Contains all features fully integrated.
Feature Branches: Each feature is implemented in its own branch for easier review and version control.
Branch Name : expences-features



## Features of Branch Name : expences-features

- add expenses
- Retrieve individual user expenses.
- Retrieve overall expenses.
- Download balance sheet.


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

### add expenses

- **URL**: `expenses/add`
- **Method**: `POST`
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
    
### Retrieve individual user expenses.

- **URL**: `expenses/user`
- **Method**: `GET`
- **Header**: Authorisation: Bearer 'your_token'


### Retrieve overall expenses.

- **URL**: `expenses/overall`
- **Method**: `GET`
- **Header**: Authorisation: Bearer 'your_token'



### Download balance sheet.

- **URL**: `expenses/balance-sheet`
- **Method**: `GET`
- **Header**: Authorisation: Bearer 'your_token'
    

