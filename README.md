# Yelp Resturant Review
<center><img src = "https://github.com/Jay-tech456/Stealth-Project/blob/main/Foodie.jpeg" height="600" width="auto"/> </center>
## Directions to Run the Application

### Prerequisites

Ensure you have installed all necessary dependencies.

### Backend Setup

1. Navigate to the backend directory and install the following dependencies:

    ```bash
    npm install cors
    npm install express
    npm install nodemon
    ```
### Explanation

This setup includes several folders to ensure the Dockerfile runs on the proper port and has the correct entry point.

- **routes**: This folder contains three subfolders used to create all the APIs.
- **server.js**: This is the entry point to the backend app. The Dockerfile entry point is now pointed to `server.js`. You can add more APIs through this file. For more information, check `backend/server.js`.

### Environment Variables

Add two `.env` files:

- One in `backend/db/.env`
- Another in `backend/.env`

> **Note**: Ensure these files are present to run the application on the proper port and establish the database connection.
> **Note**: Request .env file to run the application

### Running the Application with Docker

Run the following Docker Compose commands:

    ```bash
    docker-compose down
    docker-compose build --no-cache
    docker-compose up
    ```


### Accessing the Application

- **Website**: [http://localhost:3000/](http://localhost:3000/)
- **Backend on Postman**: [http://localhost:5001/](http://localhost:5001/api/...)
>**Note ** Request API Path, or look at the login.js and resturant.js for endpoint

---

Feel free to reach out if you have any questions or run into any issues.
