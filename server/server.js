const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./sequelize');
const StudentList = require('./models/StudentList')(sequelize);
const multer = require('multer');
const xlsx = require('xlsx');
const app = express();
const port = process.env.PORT || 3001;
var dataTime = new Date();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get all students
app.get('/studentsData', async (req, res) => {
  try {
    const students = await StudentList.findAll(

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
    let data;

    if (req.file) {
      const buffer = req.file.buffer;
      const wb = xlsx.read(buffer, { type: 'buffer' });
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      data = xlsx.utils.sheet_to_json(sheet);
    } else if (req.body) {
      // Use the data from req.body if no file is uploaded
      data = [req.body];
      console.log(data);
    } else {
      throw new Error('No data provided');
    }

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
              year: parseInt(row.year),
              semester: parseInt(row.semester),
              contact: row.contact,
              email: row.email,
              projectID: row.projectID,
              createdAt: sequelize.literal('CURRENT_TIMESTAMP'),
              updatedAt: sequelize.literal('CURRENT_TIMESTAMP'),
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

// testing
// Add this endpoint to your Express app
// Add this endpoint to your Express app
app.get('/enrollmentNumbers', async (req, res) => {
  try {
    const enrollmentNumbers = await StudentList.findAll({
      attributes: ['enrollmentNumber'],
      raw: true,
    });

    const numbers = enrollmentNumbers.map((student) => student.enrollmentNumber);

    res.json(numbers);
  } catch (error) {
    console.error('Error fetching enrollment numbers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Endpoint to get student details based on enrollment number
app.get('/studentDetails/:enrollmentNumber', async (req, res) => {
  try {
    const enrollmentNumber = req.params.enrollmentNumber;

    const studentDetails = await StudentList.findOne({
      where: { enrollmentNumber: enrollmentNumber },
    });

    if (!studentDetails) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(studentDetails);
    }
  } catch (error) {
    console.error('Error fetching student details:', error);
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
