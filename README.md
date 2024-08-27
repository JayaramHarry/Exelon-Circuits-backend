# City Management API

## Overview

This project is a Node.js API for managing a collection of cities. The API allows you to add, update, delete, and retrieve city data from a MongoDB database. It supports pagination, filtering, sorting, searching, and projection for retrieving cities.

## Features

- **Add City**: Add a new city to the collection.
- **Update City**: Update an existing city in the collection.
- **Delete City**: Delete a city from the collection.
- **Get Cities**: Retrieve cities with support for pagination, filtering, sorting, searching, and projection.

## Technologies Used

- Node.js
- Express
- MongoDB (via Mongoose)
- Postman (for API testing)

## Installation

### Prerequisites

- Node.js
- MongoDB Atlas account (or a local MongoDB instance)

### Setup

1. **Clone the repository:**

   
   git clone https://github.com/your-username/city-management-api.git
   cd city-management-api

2. **Install dependencies:**
    
    npm install

3. **Configure MongoDB:**

    Replace the MongoDB connection string in index.js with your MongoDB Atlas connection string.

    mongoose.connect('mongodb+srv://<username>:<password>@cluster.mongodb.net/cityDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

4. **Run the server:**

    node index.js
    The server will start on port 3000 by default. You can change this by setting the PORT environment variable.


### API Endpoints
    1. Add City
    Endpoint: POST /api/cities
    Description: Add a new city to the collection.
    
    Request Body:
    {
    "name": "San Francisco",
    "population": 883305,
    "country": "USA",
    "latitude": 37.7749,
    "longitude": -122.4194
    }

    Response:
    {
    "message": "City added successfully",
    "city": {
        "_id": "some_id",
        "name": "San Francisco",
        "population": 883305,
        "country": "USA",
        "latitude": 37.7749,
        "longitude": -122.4194,
        "createdAt": "2024-08-27T00:00:00.000Z",
        "updatedAt": "2024-08-27T00:00:00.000Z",
        "__v": 0
        }
    }

    2.  Update City
    Endpoint: PUT /api/cities/:id
    Description: Update an existing city by ID.
    Request Body:
    
    {
        "name": "San Francisco",
        "population": 900000,
        "country": "USA",
        "latitude": 37.7749,
        "longitude": -122.4194
    }
    URL Parameter: id (City ID)
    
    Response:
    {
        "message": "City updated successfully",
        "city": {
            "_id": "some_id",
            "name": "San Francisco",
            "population": 900000,
            "country": "USA",
            "latitude": 37.7749,
            "longitude": -122.4194,
            "createdAt": "2024-08-27T00:00:00.000Z",
            "updatedAt": "2024-08-27T00:00:00.000Z",
            "__v": 0
        }
    }

    3. Delete City
    Endpoint: DELETE /api/cities/:id
    Description: Delete a city by ID.
    URL Parameter: id (City ID)
    Response:

    {
        "message": "City deleted successfully"
    }

    4. Get Cities
    Endpoint: GET /api/cities
    Description: Retrieve cities with support
        for pagination, filtering, sorting, searching, and projection.
    Query Parameters:
        page (default: 1) - Page number for         pagination
        limit (default: 10) - Number of cities per page
        filter - JSON string to filter results (e.g., {"country":"USA"})
        sort - Field to sort by (e.g., population)
        search - Search term (e.g., San)
        projection - Fields to include (e.g., name population)
    
    Response:
    
    {
        "page": 1,
        "limit": 10,
        "total": 1,
        "cities": [
            {
                "_id": "some_id",
                "name": "San Francisco",
                "population": 883305,
                "country": "USA",
                "latitude": 37.7749,
                "longitude": -122.4194,
                "createdAt": "2024-08-27T00:00:00.000Z",
                "updatedAt": "2024-08-27T00:00:00.000Z",
                "__v": 0
            }
        ]
    }

### Troubleshooting
MongoDB Connection Error: Ensure your MongoDB connection string is correct and you have access permissions.
Data Not Being Added: Check server logs for errors and verify request payload in Postman.
Empty Responses: Verify your route handlers and database schema.