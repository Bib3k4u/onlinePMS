const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./sequelize');
const StudentList = require('./models/StudentList')(sequelize);

const app = express();
const port = process.env.PORT || 3001;
const Excel = require('exceljs')
const wb = new Excel.Workbook();
const path = 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await StudentList.findAll(
      {
        attributes:['nameOfStudent','year']
      }
    );
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new student
app.post('/students', async (req, res) => {
  try {
    const newStudent = await StudentList.create(req.body);
    res.json(newStudent);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sync the model with the database and start the server
StudentList.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Error syncing StudentList:', error);
});
