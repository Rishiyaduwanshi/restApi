
# RestAPI practice 

This repository contains a simple Node.js application built using Express.js for managing users. It provides both HTML and API endpoints to interact with user data stored in `MOCK_DATA.json`.

## Features

- **Root Endpoint:** Displays a welcome message and provides navigation links.
- **Users Endpoint (`/users`):** Lists all users in HTML format with links to individual user details.
- **User Details Endpoint (`/users/:studentId`):** Retrieves details of a specific user by `studentId`.
- **API Endpoint (`/api/users`):** Returns JSON data containing all users.
- **API Endpoint for Specific User (`/api/users/:studentId`):**
  - **GET:** Retrieves details of a specific user.
  - **PUT:** Placeholder for updating user information.
  - **PATCH:** Placeholder for partially updating user information.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- npm (Node Package Manager) or pnpm (optional u can use npm instead of that i have used pnpm )
- Git (optional, for cloning the repository)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone git@github.com:Rishiyaduwanshi/restApi.git
   cd restApi
   ```

2. **Install dependencies:**

   ```bash
   npm install  or pnpm i 
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of your project and add the following variables:

   ```plaintext
   PORT=4521
   APP_URI=http://localhost:4521
   ```

   Modify `PORT` and `APP_URI` values as needed.

4. **Start the server:**

   ```bash
   npm start  or pnpm start 
   ```

   This will start the server on the specified `PORT` and display a message like `Server is running on port 4521 http://localhost:4521`.

5. **Access the application:**

   Open a web browser and navigate to `http://localhost:4521` to view the application.

## Usage

- Visit the homepage (`/`) to get started and navigate to different endpoints using provided links.
- Access user data in HTML format at `/users`.
- Retrieve specific user details at `/users/:studentId`.
- Access all user data in JSON format at `/api/users`.
- Use `/api/users/:studentId` for CRUD operations (GET, PUT, PATCH) on specific users.

## live on -- > https://restapi-fjcv.onrender.com/

## Authors

- Abhinav Prakash - Initial work

## Acknowledgments

- Built with Node.js and Express.js
- Data provided by `MOCK_DATA.json`
