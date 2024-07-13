
# RESTful API Documentation

Welcome to the documentation for our RESTful API. This API allows you to perform CRUD operations on user data. Below you will find details on available routes, methods, and how to interact with the API using Postman or any other API testing tool.

## Getting Started

To get started with the API, follow these steps:

### Prerequisites

- Node.js installed on your machine
- MongoDB installed locally or accessible via a URI
- Postman or any API testing tool

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following variables:

   ```
   PORT=4500
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   APP_URI=http://localhost:4500
   ```

   Replace `your-database-name` with your MongoDB database name.

4. Start the server:

   ```
   npm start
   ```

   This will start the server at `http://localhost:4500`.

## API Routes

### Users

- **GET /users**
  - Fetch all users.

- **POST /users**
  - Create a new user.
  - Request body should include:
    ```json
    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "age": 30,
      "major": "Computer Science",
      "gpa": 3.8,
      "enrollment_date": "2023-01-01",
      "graduation_date": "2027-05-15"
    }
    ```

- **GET /users/:student_id**
  - Fetch a user by ID.

- **PATCH /users/:student_id**
  - Update a user by ID.
  - Send only the fields to be updated in the request body.
    ```json
    {
      "email": "new.email@example.com",
      "age": 31
    }
    ```

- **DELETE /users/:student_id**
  - Delete a user by ID.

### API

All the above routes are also available under `/api`. For example:

- **GET /api/users**
- **POST /api/users**
- **GET /api/users/:student_id**
- **PATCH /api/users/:student_id**
- **DELETE /api/users/:student_id**

## Testing the API

Use Postman or any other API testing tool to test the endpoints described above. Make sure to replace `:student_id` with the actual ID of the user you want to interact with.

