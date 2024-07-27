const express = require('express');
const sequelize = require('./config/database');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")
const petRoutes = require('./routes/petRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/auth', authRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync(); 
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/pets', petRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
