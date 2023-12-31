const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./sequelize');
const { Sequelize,Op } = require('sequelize');

const StudentList = require('./models/StudentList')(sequelize);
const ProjectList = require('./models/ProjectList')(sequelize);
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
app.get('/projectsData', async (req, res) => {
  try {
    // Assuming 'columnName' is the name of the column you want to check the third character for
    const columnName = 'projectId';
    const year = req.query.year;
    const semester = req.query.semester;

    const projects = await ProjectList.findAll({
      attributes: [columnName],
      where: {
        [Op.and]: [
          { [columnName]: { [Op.startsWith]: `BT${year}` } },
          { year: year },
          { semester: semester },
        ],
      },
      order: [['projectId', 'DESC']],
      limit: 1,
    });

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
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


app.get('/createProjectIdTable/:projectId', async (req, res) => {
  const tableName = req.params.projectId;
  try {
    // Check if the table already exists
    const tableExists = await sequelize.queryInterface.showAllTables()
      .then((tableNames) => tableNames.includes(tableName));

    if (!tableExists) {
      // Dynamically create the table
      await sequelize.queryInterface.createTable(tableName, {
        enrollmentNumber:{
            type:Sequelize.STRING,
            primaryKey:true,
            allowNull:false,
        },
        verfication:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        status:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        currentStatus:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        marks:{
            type:Sequelize.STRING,
            allowNull:false,
        }
        // ... other columns
      });

      res.json({ message: `Table '${tableName}' created successfully` });
    } else {
      res.json({ message: `Table '${tableName}' already exists.` });
    }
  } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).json({ error: 'Internal server Error' });
  }
});


app.post('/addMemberData/:projectId', async (req, res) => {
  try {
    const tableName = req.params.projectId;

    // Access the enrollment numbers from the request body
    const enrollmentNumbers = req.query.enrollment;
    console.log('Enrollment numbers:', enrollmentNumbers);

    // Check if the table exists
    const tableExists = await sequelize.queryInterface.showAllTables()
      .then((tableNames) => tableNames.includes(tableName));

    if (tableExists) {
      // Use Sequelize model for the dynamically created table
      const ProjectTable = sequelize.define(tableName, {
        enrollmentNumber: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
        },
        verification: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        currentStatus: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        marks: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      });

      // Add enrollment numbers to the table
      await ProjectTable.bulkCreate(enrollmentNumbers.map(enrollmentNumber => ({
        enrollmentNumber,
        verification: 'default_verification_value',
        status: 'default_status_value',
        currentStatus: 'default_current_status_value',
        marks: 'default_marks_value',
      })));

      res.status(200).json({ message: 'Enrollment numbers added successfully' });
    } else {
      res.status(404).json({ error: `Table '${tableName}' does not exist.` });
    }
  } catch (error) {
    console.error('Error handling enrollment numbers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sync the model with the database and start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Error syncing StudentList:', error);
});
