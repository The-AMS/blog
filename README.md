# Blog REST API

This is a **RESTful API** built with **Node.js**, designed to manage a blog platform. It handles user authentication, post management, category creation, and reaction features. The API also supports image uploads for blog posts and provides role-based access control with **JWT**.

## Features

- **User Authentication**: Register, login, and secure authentication using **JWT**.
- **Post Management**: Create, update, delete, and read blog posts.
- **Category Management**: Organize blog posts by categories.
- **Reaction System**: Allows users to react (like/dislike) to blog posts.
- **Image Upload**: Upload images for blog posts using **Multer**.
- **Role-Based Access Control**: Admin and user roles for controlling access to certain features.
- **Cashing System**: In-memory data store used for session management and caching.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for building web applications.
- **MongoDB & Mongoose**: NoSQL database and object modeling library.
- **Redis**: Fast key-value store for managing user sessions and improving application performance.
- **JWT (jsonwebtoken)**: For secure authentication and session management.
- **Bcrypt**: For password hashing.
- **Express-validator**: For validating and sanitizing inputs.
- **Multer**: Middleware for handling file uploads.
- **Path**: Utility for file and directory paths.
- **Dotenv**: Environment variable management.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blog-rest-api.git
   cd blog-rest-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add the following:
   ```bash
   PORT = your-port
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   ```

4. Run the application:
   ```bash
   npm start
   ```

## Folder Structure

- **controllers/**: Contains logic for handling requests (auth, posts, categories, reactions, uploads).
- **middleware/**: Custom middlewares such as authentication, error handling, and validation.
- **models/**: MongoDB schemas for Users, Posts, Categories, and Reactions.
- **routes/**: Defines the routes for different API features (authentication, posts, categories, etc.).
- **uploads/**: Directory for storing uploaded images.
- **app.js**: Main entry point of the application.

## Scripts

- **start**: Start the application using `nodemon` for live reload.

## Dependencies

- **bcrypt**: Password hashing for security.
- **body-parser**: Parse incoming request bodies.
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Minimalist web framework for Node.js.
- **express-validator**: Middleware for validation.
- **jsonwebtoken**: Handles token-based authentication.
- **mongoose**: Object modeling for MongoDB.
- **multer**: Middleware for handling file uploads.
- **path**: Provides utilities for working with file and directory paths.
- **redis**: In-memory data store for caching and managing sessions efficiently.

## License

This project is licensed under the ISC License.
