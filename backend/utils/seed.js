const bcrypt = require('bcrypt');
const { User, Task, sequelize } = require('../models');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // Reset DB

    // Create admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash: adminPassword,
      role: 'admin'
    });

    // Create employees
    const emp1Password = await bcrypt.hash('emp123', 10);
    const emp1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash: emp1Password,
      role: 'employee'
    });

    const emp2Password = await bcrypt.hash('emp123', 10);
    const emp2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      passwordHash: emp2Password,
      role: 'employee'
    });

    // Create sample tasks
    await Task.create({
      title: 'Complete project report',
      description: 'Finish the quarterly project report',
      assignedTo: emp1.id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      status: 'Pending'
    });

    await Task.create({
      title: 'Update website',
      description: 'Update the company website with new content',
      assignedTo: emp2.id,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: 'In Progress'
    });

    await Task.create({
      title: 'Review code',
      description: 'Review the latest code changes',
      assignedTo: emp1.id,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'Completed'
    });

    console.log('Seeding completed successfully');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    process.exit();
  }
};

seed();
