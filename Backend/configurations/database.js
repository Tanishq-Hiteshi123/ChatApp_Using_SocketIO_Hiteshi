const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host (e.g., localhost)
    dialect: 'postgres',       // Database type
    logging: false,            // Disable SQL query logging
  }
);

(async () => {
    try {
      await sequelize.sync({ alter: true }); // Creates or updates tables based on models
      console.log('Database synced successfully!');
    } catch (err) {
      console.error('Error syncing database:', err.message);
    }
  })();

module.exports = sequelize;