# Simple Authentication System
A beginner-friendly authentication system built with Node.js and Express. This project includes features like user registration, login, password hashing with bcrypt, and token-based authentication using JWT.

## Features
- Register new users
- Login with email and password
- Password hashing with bcrypt
- JWT token generation on successful login
- Protected routes that require authentication


## Technologies Used
- Node.js
- Express.js
- bcrypt
- JSON Web Token (JWT)
- dotenv (for environment variables)
- Nodemon for development

## Installation
# Clone the repository:
git clone https://github.com/yourusername/auth-system.git
cd auth-system

# Install dependencies
npm install

# Create a .env file with the following
PORT=5000
JWT_SECRET=your_jwt_secret

# Run the server
nodemon app.js