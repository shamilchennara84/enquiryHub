# enquiryHub

## Description

enquiryHub is a backend application designed to manage user enquiries and profiles. It provides functionalities for creating, retrieving, updating, and deleting data related to enquiries and profiles. This project is built with Node.js, utilizing Express.js for the web server, Mongoose for MongoDB object modeling, and Typesense for search functionality.

## Features

- **User Management:** Create, retrieve, update, and delete user profiles.
- **Enquiry Handling:** Manage user enquiries with functionalities for creating, retrieving, and deleting enquiries.
- **Authentication:** Secure user authentication using JWT tokens.
- **Search Functionality:** Utilize Typesense for efficient search operations.

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB(should enabled replica set)
- Typesense

### Installation

1. Clone the repository:
2. Navigate to the project directory:
3. Set up environment variables by creating a `.env` file in the root directory (refer .env.example)
4. Start the application:
## API Documentation

## Authentication

enquiryHub uses JWT (JSON Web Tokens) for authentication. To authenticate, you must first obtain a JWT token by sending a POST request to the `/login` endpoint with valid credentials. The JWT token is then included in the Authorization header of subsequent requests.

### User Management

- **Endpoint**: `POST `(/api/users/register)`
- **Description**: Creates a new user.
- **Request Body**:{
  "first_name": "sample",
  "last_name": "Doe",
  "email": "ssss@example.com",
  "password": "password"
}
- **Response**: {
    "message": "User created successfully",
    "user": {
        "type": "user",
        "first_name": "sample",
        "last_name": "Doe",
        "email": "ssss@example.com",
        "password": "{{hashedPassword}}",
        "_id": "65edb7320f4748d1ab6f6634",
        "createdAt": "2024-03-10T13:35:46.151Z",
        "updatedAt": "2024-03-10T13:35:46.151Z",
        "__v": 0
    }
}

- **Endpoint**: `POST `(/api/users/login)`
- **Description**: Authenticates a user and returns a JWT token..
- **Request Body**:{
  "email": "ssss@example.com",
  "password": "password"
}
- **Response**: {
    "message": "Login successfull",
    "user": {
        "_id": "65edb7320f4748d1ab6f6634",
        "type": "user",
        "first_name": "sample",
        "last_name": "Doe",
        "email": "ssss@example.com",
        "password": "{{hashedPassword}}",
        "createdAt": "2024-03-10T13:35:46.151Z",
        "updatedAt": "2024-03-10T13:35:46.151Z",
        "__v": 0
    },
    "token": "{{JWT TOKEN}}"
}

### Profile Management

#### Get User Profile

- **Endpoint**: `GET /api/users/profile`
- **Description**: Retrieves the profile of a user.
- **Headers**:{Authorization: bearer "{{JWT TOKEN}}"}
- **Response**: {
    "message": "Profile retrieved successfully",
    "profile": {
        "_id": "65edcdfcee406f6dcd8b777a",
        "user_Id": "65edb7320f4748d1ab6f6634",
        "profile_info": "Developer",
        "createdAt": "2024-03-10T15:13:00.032Z",
        "updatedAt": "2024-03-10T15:13:00.032Z",
        "__v": 0
    }

}
#### Create Profile

- **Endpoint**: `POST /api/users/createProfile`
- **Description**: Creates a new profile for a user.
- **Headers**:{Authorization: bearer "{{JWT TOKEN}}"}
- **Request Body**:{
    "profile_info":"Developer"
}
- **Response**: {
    "message": "Profile created and user updated",
    "createdProfile": {
        "user_Id": "65edb7320f4748d1ab6f6634",
        "profile_info": "Developer",
        "_id": "65edcf4eee406f6dcd8b7783",
        "createdAt": "2024-03-10T15:18:38.053Z",
        "updatedAt": "2024-03-10T15:18:38.053Z",
        "__v": 0
    }
}

### Additional Endpoints for profile

- **Edit Profile**: `PUT api/users/editProfiles/:profileId`
- **Delete Profile**: `DELETE api/users/deleteProfiles/:profileId`



