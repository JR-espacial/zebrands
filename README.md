# zebrands

# Node.js Express API Documentation

## Overview

This API provides a catalog system for managing products. It allows users to list, get details, create, update, and delete products.

## Authorization

### Bearer Token

All endpoints in this API require authorization using a bearer token. To access the endpoints, include the bearer token in the `Authorization` header of your requests.

### Example

GET /products HTTP/1.1
Host: localhost:3000
Authorization: Bearer YOUR_ACCESS_TOKEN

## Base URL

 Live Server: http://146.190.2.147:3000/
 Local Server: http://localhost:3000

## Obtaining a Bearer Token

### Importance of Auth0

Auth0 provides secure authentication and authorization, ensuring only authorized users can access our API endpoints.

### For Testing Purposes

I have included an endpoint so you can obtain a bearer token using the `/getToken` endpoint:

1. GET /getToken
   - This endpoint returns a bearer token for testing purposes.
   
2. Include the obtained token in the `Authorization` header of your API requests.

### In a Real Application We Would

1. Authenticate the User
   - Direct users to Auth0 for login and get an authorization code.
   
2. Exchange Authorization Code for Access Token

## Endpoints Defined in This API

### Products

- List Products
  - GET /products
  - Retrieves a list of all products.

- Get One Product
  - GET /products/:id
  - Retrieves details of a single product by its ID.

- Create Product
  - POST /products
  - Creates a new product.

- Update Product
  - PUT /products/:id
  - Updates an existing product by its ID.

- Delete Product
  - DELETE /products/:id
  - Deletes an existing product by its ID.

## Admin Endpoints

### Authorization

All admin endpoints require authorization using a bearer token. Include the bearer token in the `Authorization` header of your requests.

### Endpoints

#### List Admins

- GET /admins
  - Retrieves a list of all admins.

#### Get One Admin

- GET /admins/:id
  - Retrieves details of a single admin by their ID.

#### Create Admin

- POST /admins
  - Creates a new admin **both in the localbd and in AUTH0**

#### Update Admin

- PUT /admins/:id
  - Updates an existing admin by their ID.

#### Delete Admin

- DELETE /admins/:id
  - Deletes an existing admin by their ID.

## Query Log Endpoints

### Authorization

All query log endpoints require authorization using a bearer token. Include the bearer token in the `Authorization` header of your requests.

### Endpoints

#### List Query Logs

- GET /query-logs
  - Retrieves a list of all query logs.


## Docker Installation

To run the API using Docker, follow these steps:

1. Make sure you have Docker installed on your system.

2. Clone the repository:
   ```
   git clone https://github.com/JR-espacial/zebrands
   ```

3. Navigate to the project directory:
   ```
   cd zebrands
   ```

4. Create a `.env` file based on `.env.example` and configure necessary variables like database connection strings and Auth0 credentials.

5. Start the Docker containers:
   ```
   docker-compose up -d
   ```

6. Access the Node.js container:
   ```
   docker exec -it <node-container-name> bash
   ```

7. Inside the container, run Prisma seed script:
   ```
   npm run prisma:seed
   ```

This will start the API containers defined in Docker Compose, initialize the database using Prisma seed script, and the API will be accessible at `http://localhost:3000`.


## Local Installation

To install and run the API locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/JR-espacial/zebrands
   ```

2. Navigate to the project directory:
   ```
   cd zebrands
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file based on `.env.example` and configure necessary variables like database connection strings and Auth0 credentials.

5. Start the server:
   ```
   npm start
   ```

The API will be available at `http://localhost:3000`.
