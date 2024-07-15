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

http://localhost:3000

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
