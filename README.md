# This repo is the front end of the chess club application

# ChessClub App

Welcome to the ChessClub app! This project is divided into three separate repositories that work together to provide a complete chess experience:

1. chess-club-frontend: The frontend of the application built with React.
chess-club-backend: The Node.js server that handles backend logic.
chess-club-backend-websocket: The WebSocket server for real-time communication.

## Getting Started

To get the project up and running on your local machine, follow these steps:

1. Fork and Clone Repositories

    1. Fork the following repositories to your GitHub account:

        - frontend
        - backend
        - websocket
    
    2. Clone the repositories to your local machine:

    ```bash
    https://github.com/Rahul-sehrawat/chess-club-frontend
    https://github.com/Rahul-sehrawat/chess-club-backend
    https://github.com/Rahul-sehrawat/chess-club-backend-websocket
    ```

2. Set Up the Backend Server

    1. Navigate to the chess-club directory:

    ```bash
    cd chess-club-backend
    ```

    2. Install dependencies:

    ```bash
    npm install
    ```

    3. Configure environment variables (e.g., database connection) as needed. Refer to the .env.example file for configuration details.

    4. Start the backend server:

    ```bash
    npm start
    ```

3. Set Up the WebSocket Server

    1. Navigate to the chess-club-websocket directory:

    ```bash
    cd chess-club-websocket
    ```

    2. Install dependencies:

    ```bash
    npm install
    ```

    3. Start the WebSocket server:

    ```bash
    npm start
    ```

4. Set Up the Frontend

    1. Navigate to the chess-club-frontend directory:

    ```bash
    cd chess-club-frontend
    ```

    2. Install dependencies:

    ```bash
    npm install
    ```

    3. Configure environment variables (e.g., API endpoints) in the .env file. Refer to the .env.example file for details.

    4. Start the frontend development server:
    ```
    npm run dev
    ```

5. Access the Application

    - Frontend: Open your browser and navigate to http://localhost:5173 to access the frontend application.
    - Backend API: The backend server will be running at http://localhost:5000 (or the port specified in your .env file).
    - WebSocket Server: The WebSocket server will be running at ws://localhost:4000 (or the port specified in your .env file).

# Contributing

If you'd like to contribute to the project, please fork the repository and submit a pull request with your changes.

# License

This project is licensed under the MIT License. See the LICENSE file for details.

# Contact

If you have any questions or issues, please open an issue on the respective repository or contact me directly.
