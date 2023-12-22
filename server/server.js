const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./sequelize');
const StudentList = require('./models/StudentList')(sequelize);
const multer = require('multer');
const xlsx = require('xlsx');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
app.post('/sdUpload', upload.single('file'), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const wb = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = wb.SheetNames[0];
    const sheet = wb.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    await sequelize.sync();

    await Promise.all(
      data.map(async (row) => {
        try {
          // Assuming 'enrollmentNumber' is a unique identifier
          const [student, created] = await StudentList.findOrCreate({
            where: { enrollmentNumber: row.enrollmentNumber },
            defaults: {
              admissionNumber: row.admissionNumber,
              nameOfStudent: row.nameOfStudent,
              branch: row.branch,
              year: row.year,
              semester: row.semester,
              contact: row.contact,
              projectID: row.projectID,
              createdAt: row.createdAt,
              updatedAt: row.updatedAt,
            },
          });

          // if (!created) {
          //   console.log(`Entry with enrollment number ${row.enrollmentNumber} already exists. Skipping.`);
          // }
        } catch (error) {
          console.error('Error adding student:', error);
        }
      })
    );

    res.json({ message: 'Data uploaded successfully' });
  } catch (error) {
    console.error('Error adding students:', error);
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
