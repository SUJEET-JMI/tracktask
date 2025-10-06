# Task Tracker

A full-stack web application for managing personal tasks with user authentication, built with React, Node.js, Express, and PostgreSQL.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Status Tracking**: Organize tasks by status (pending, in progress, completed)
- **Filtering & Search**: Filter tasks by status and tags
- **Task Details**: View detailed information for each task
- **Responsive Design**: Modern UI built with TailwindCSS
- **RESTful API**: Well-structured backend API

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for database operations
- **PostgreSQL** - Database
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **TailwindCSS** - Utility-first CSS framework

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** - [Download here](https://www.postgresql.org/download/)
- **npm** or **yarn** - Package manager (comes with Node.js)

## Installation

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see Environment Variables section below).

4. **Set up the database** (see Database Setup section below).

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgresql_username
DB_PASSWORD=your_postgresql_password
DB_NAME=task_management
JWT_SECRET=your_super_secret_jwt_key_here
```

**Note:** Replace the placeholder values with your actual PostgreSQL credentials and choose a strong JWT secret.

## Database Setup

1. **Create a PostgreSQL database:**
   ```sql
   CREATE DATABASE task_management;
   ```

2. **Update the `.env` file** with your database credentials.

3. **The application will automatically create the necessary tables** when you start the server (thanks to Sequelize sync).

## Running the Application

### Development Mode

1. **Start the backend server:**
   ```bash
   cd backend
   node server.js
   ```
   The backend will run on `http://localhost:5000`

   *Note: You may want to add a "start" script to `backend/package.json`:*
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port)

3. **Open your browser** and navigate to `http://localhost:5173` to use the application.

### Production Build

1. **Build the frontend for production:**
   ```bash
   cd frontend
   npm run build
   ```
   This creates an optimized build in the `dist` folder.

2. **Serve the built files** using a static server or integrate with your backend.

3. **For the backend**, consider using a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "task-tracker-backend"
   ```

## Usage

1. **Register a new account** or **login** with existing credentials.

2. **View your tasks** on the dashboard with filtering options.

3. **Create new tasks** from the "My Tasks" page.

4. **Click on any task** to view its details and make updates.

5. **Filter tasks** by status (pending, in progress, completed) or by tags.

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with existing credentials

### Task Endpoints
- `GET /tasks` - Retrieve all tasks (supports query parameters for filtering)
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a specific task by ID
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

**Query Parameters for GET /tasks:**
- `status`: Filter by task status (pending, in_progress, completed)
- `tags`: Filter by tags

## Test Account

For testing purposes, you can use the following account:

- **Email:** newtest@gmail.com
- **Password:** 12345

## Project Structure

```
task-tracker/
├── backend/
│   ├── config/
│   │   ├── config.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── authcontroller.js
│   │   └── taskscontroller.js
│   ├── middleware/
│   │   └── authmiddleware.js
│   ├── models/
│   │   ├── index.js
│   │   ├── task.js
│   │   └── user.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── utils/
│   │   └── jwt.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Deployment

The frontend of this Task Management System is deployed on Vercel and can be accessed at:  
[https://richmonks.vercel.app/](https://richmonks.vercel.app/)

The backend API and PostgreSQL database are hosted on Render.

This setup provides a live, production-ready environment for testing and usage without local setup.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
