# MPC Exhibition

A web application for managing and displaying posts, built with a React frontend and Node.js/Express backend.

## Features

- User authentication
- Post creation and management
- Image uploads (Cloudinary integration)
- Responsive UI

## Project Structure

- `frontend/` — React app (Vite, components, pages, context)
- `backend/` — Node.js/Express API (controllers, models, routes, config)
- `assets/` — Static assets (images, gifs)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd mpc-exhibition
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

### Environment Variables

You must create environment variable files for both backend and frontend:

- `backend/.env` (see `backend/.env.example`)
- `frontend/.env` (see `frontend/.env.example`)

### Running the App

- **Backend**:
  ```bash
  cd backend
  cp .env.example .env  # Copy the example env file
  npm start
  ```
- **Frontend**:
  ```bash
  cd frontend
  cp .env.example .env  # Copy the example env file
  npm run dev
  ```

## Configuration

- Backend: configure environment variables for MongoDB, Firebase, and Cloudinary in `backend/src/config/`
- Frontend: update API endpoints in `frontend/src/config/axios/` and Firebase config in `frontend/src/config/firebase/`
