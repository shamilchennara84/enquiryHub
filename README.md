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
4. Add google.json API KEY
5. Start the application:
## API Documentation

## Authentication

enquiryHub uses JWT (JSON Web Tokens) for authentication. To authenticate, you must first obtain a JWT token by sending a POST request to the `/login` endpoint with valid credentials. The JWT token is then included in the Authorization header of subsequent requests.

for API REFERENCE VISIT : -https://www.notion.so/Postman-SnapShots-7294bf35c555411daba5021274dbf3aa?pvs=4
