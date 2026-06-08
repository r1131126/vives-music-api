Vives Music API

This repository contains a RESTful API developed using Node.js, Express, and MongoDB (via Mongoose) to manage a music database including users, artists, albums, and songs.

Deployment Link
The application is successfully deployed in production and can be accessed at:
URL: https://vives-music-api.onrender.com

Technical Stack
Backend Framework: Node.js and Express.js
Database Management: MongoDB Atlas (Cloud Database)
Data Modeling: Mongoose (Utilizing both referenced and embedded documents)
security and Authentication: JSON Web Tokens (JWT) for route protection and bcrypt for password hashing
Hosting Platform: Render

Project Architecture
The project is structured according to a separation of concerns design pattern:
models/ - Contains Mongoose schemas and models for application entities.
routes/ - Defines the application endpoints and maps them to controllers.
middlewares/ - Handles authentication verification, data validation, and centralized global error catching.
server.js - The entry point of the application that initializes the server and database connection.

API Endpoints

The API supports 17 operational endpoints structured as follows:

Authentication
POST /api/auth/register - Register a new user account.
POST /api/auth/login - Authenticate a user and return a JWT access token.

 Artists
GET /api/artists - Retrieve all artists.
POST /api/artists - Create a new artist record.
GET /api/artists/:id - Retrieve a specific artist by ID.

 Albums
GET /api/albums - Retrieve all albums.
POST /api/albums - Create a new album under a specific artist.

 Songs
GET /api/songs - Retrieve all songs.
POST /api/songs - Add a new song to an album.

 Testing and Verification
A complete testing suite has been provided within the repository root directory:
File: thunder-tests.json

This file contains the full collection of requests required to test the 17 endpoints. It can be directly imported into the Thunder Client or Postman extensions to verify the functionality of all routes, including secured endpoints that require a valid bearer token.

 Author
Name: Alba Atenea Juan Lloret
GitHub Profile: https://github.com/r1131126