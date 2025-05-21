# Line of Best Fit Learning Tool

A web application designed to help teachers assess students' understanding of the line of best fit concept. This application provides an interactive platform for students to practice and teachers to evaluate their understanding of statistical concepts.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
  - [Database Setup](#database-setup)
  - [Environment Configuration](#environment-configuration)
  - [Running the Backend](#running-the-backend)
- [Frontend Setup](#frontend-setup)
  - [Environment Configuration](#frontend-environment-configuration)
  - [Running the Frontend](#running-the-frontend)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Tech Stack](#tech-stack)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## Project Structure

```
.
├── backend/         # Node.js/Express backend server
│   ├── src/        # Source code
├── frontend/       # React frontend application
│   ├── src/        # Source code
│   ├── public/     # Static files
└── README.md
```

## Backend Setup

### Database Setup

1. Install PostgreSQL if you haven't already
2. Create a new database:
   ```sql
   CREATE DATABASE <database_name>;
   ```

3. Navigate to the backend directory:
   ```bash
   cd backend
   ```

4. Create a `.env` file in the backend directory with the following content:
   ```
   DATABASE_URL="postgresql://postgres:<your_password>@localhost:5432/<database_name>"
   ```
   Replace `your_password` and `database_name` with your actual PostgreSQL password and name.

5. Install dependencies:
   ```bash
   npm install
   ```

6. Run database migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

### Running the Backend

1. For development:
   ```bash
   npm run dev
   ```

2. For production:
   ```bash
   npm run build
   npm start
   ```

The backend server will start on http://localhost:5000 by default.

## Frontend Setup

### Frontend Environment Configuration

1. Navigate to the frontend directory (On another terminal):
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Frontend

1. Create a `.env` file in the frontend directory with the following content:
   ```
   REACT_APP_BACKEND_URL="<backend_url>"
   ```
   Replace `backend_urlL` with the backend url. The default should be `http://localhost:5000`.

2. For development:
   ```bash
   npm start
   ```

2. For production build:
   ```bash
   npm run build
   ```

The frontend development server will start on http://localhost:3000.

## Testing

### Backend Testing
1. Create a Testing Database
   ```sql
   CREATE DATABASE <database_name_test>;
   ```

2. Create a `.env.test` file in the backend directory with the following content:
   ```
   DATABASE_URL="postgresql://postgres:<your_password>@localhost:5432/<database_name_test>"
   ```
   Replace `your_password` and `database_name_test` with your actual PostgreSQL password and name.

3. Run test database migrations:
   ```bash
   cd backend
   npm run migrate:test
   ```
4. Run Test
   ```bash
   npm test
   ```

## API Documentation

The backend provides the following main endpoints:
- `POST /api/students` - Create a student profile
- `GET /api/questions` - Retrieve a question
- `POST /api/questions/check` - Submit a student attempt


## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL with Prisma ORM
- Jest for testing
- CORS for cross-origin resource sharing
- Body-parser for request parsing

### Frontend
- React 19
- TypeScript
- Tailwind CSS for styling
- Axios for API requests

## Development Questions

1. Do you have production experience with Node prior to the submission of this code challenge? 
   - Yes, over 7 years

2. Do you have production experience with React prior to the submission of this code challenge? 
   - Yes, over 5 years

3. Your full name: 
   - Adebayo Bakare
   
