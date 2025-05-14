# Line of Best Fit Learning Tool A TouchBistro Assignment

A web application to help teachers assess students' understanding of the line of best fit concept.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Project Structure

```
.
├── backend/         # Node.js backend server
├── frontend/        # React frontend application
└── README.md
```
## Backend Setup
### Database Setup

1. Install PostgreSQL if you haven't already
2. Create a new database:
   ```sql
   CREATE DATABASE touchbistro;
   ```

3. Navigate to the backend directory:
   ```bash
   cd backend
   ```

4. Create a `.env` file in the backend directory with the following content:
   ```
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/touchbistro"
   ```
   Replace `your_password` with your actual PostgreSQL password. Assuming you used the default configuration during postgres installation. Otherwise adjust port and database user in the url accordingly.

5. Install dependencies:
   ```bash
   npm install
   ```

6. Run database migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

7. Seed the database with sample questions:
   ```bash
   npm run seed
   ```
   This will populate the database with 5 sample questions, each containing:
   - A line equation (e.g., "y=1.5x+0.3")
   - 5 data points that fit the equation
   - Various difficulty levels and patterns

This will set up the following database schema:
- `Student`: Stores student information
- `Question`: Stores questions and their correct answers
- `DataPoint`: Stores coordinate points for each question
- `Attempt`: Tracks student attempts and responses

### Database Schema Details

#### Student
- Tracks individual student information
- Contains unique student names
- Links to student attempts

#### Question
- Stores question data including correct equations
- Contains sets of 5 data points
- Tracks all attempts made for each question

#### DataPoint
- Stores x and y coordinates for questions
- Each point is linked to a specific question
- Uses floating-point numbers for precise coordinates

#### Attempt
- Records student responses
- Tracks attempt numbers (limited to 3 per question)
- Links attempts to both students and questions
- Stores whether the attempt was correct

### Frontend Setup
[To be added: Testing instructions]

## Development Questions

1. Do you have production experience with Node prior to the submission of this code challenge? If yes, for how long? 0ver 7 years


2. Do you have production experience with React prior to the submission of this code challenge? If yes, for how long? Over 5 years


3. Your full name: Adebayo Bakare



## Running the Application

[To be added: Application running instructions]

## Testing

[To be added: Testing instructions]