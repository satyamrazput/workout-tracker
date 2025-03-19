# Workout Tracker API

This is a RESTful API for a workout tracker application built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Password hashing with bcrypt
- Create, read, and delete workouts
- CORS enabled for cross-origin requests

## Getting Started

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/workout-tracker
   JWT_SECRET=your_secret_key
   ```
5. Start the server: `npm run dev`

## API Endpoints

- `POST /api/auth/signup` - Create a new user
- `POST /api/auth/login` - Login a user
- `POST /api/workouts` - Create a new workout
- `GET /api/workouts` - Get all workouts for the logged-in user
- `DELETE /api/workouts/:id` - Delete a workout by ID
