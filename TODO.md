# Task Tracker Update Plan

## Backend Updates
- [x] Keep PostgreSQL DB (no change needed)
- [x] Update models/user.js: Change username to name, add role field (enum 'admin', 'employee')
- [x] Update models/task.js: Change status enum to 'Pending', 'In Progress', 'Completed', rename userId to assignedTo, update associations
- [x] Update controllers/authcontroller.js: Change signup to register with name, email, password, role
- [x] Update controllers/taskscontroller.js: Rewrite for admin create tasks (assignedTo), GET all/own tasks with filters/pagination, PUT update title/desc/dueDate/status
- [x] Update routes/auth.js: Change to POST /register
- [x] Update routes/tasks.js: Update endpoints to /api/tasks
- [x] Update server.js: Change route to /api/tasks
- [x] Create backend/utils/seed.js: Seed script for 1 admin, 2 employees, sample tasks
- [x] Create backend/.env.example: With DB vars, JWT_SECRET, etc.

## Frontend Updates
- [ ] Update contexts/authcontext.jsx: Handle role in user object
- [ ] Update components/Login.jsx: Use name instead of username
- [ ] Update components/Signup.jsx: Add role selection
- [ ] Update pages/dashboard.jsx: Split into admin (add employee, add task, view all tasks) and employee (view own tasks)
- [ ] Update pages/mytasks.jsx: For employees to view/update own tasks
- [ ] Update services/authservice.js: For register/login with role
- [ ] Update App.jsx: Add role-based routing
- [ ] Change "Task Management System" to "Task Tracker" in UI
- [ ] Create frontend/.env.example: With API_BASE_URL

## Testing and Final
- [ ] Test backend APIs with MySQL
- [ ] Test frontend with role-based access
- [ ] Ensure proper error handling and loading states
- [ ] Run seed script
