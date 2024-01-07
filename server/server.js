const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const sequelize = require("./sequelize");
const { Sequelize } = require("sequelize");

const Student = require("./models/StudentList")(sequelize);
const Teacher = require("./models/Teacher")(sequelize);
const Admin = require('./models/Admin')(sequelize);
const Task = require('./models/Task')(sequelize);
const Project = require('./models/ProjectList')(sequelize);


const studentRoute = require('./routes/StudentRoutes');
const TeacherRoute = require('./routes/TeacherRoutes');
const ProjectRoute = require('./routes/ProjectRoutes');

const {authenticateUser,authorizeTeacher } = require('./middlewareAuthorization');
const ProjectMember = require("./models/ProjectMember")(sequelize);
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

// Use express-session middleware to manage sessions
app.use(
  session({
    secret: "#12332kasdfjo32kasdf123", // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 3600000, // Session expiration time in milliseconds (1 hour in this example)
    },
  })
);

app.use(authenticateUser);

app.get('/user', async (req, res) => {
  const { userId, role } = req.query; // Assuming you're sending these parameters as query parameters
  console.log(role);
  try {
    let userData;

    switch (role) {
      case 'Student':
        userData = await Student.findAll({
          where: { AdmissionNumber: userId }
        });
        break;
      case 'Teacher':
        userData = await Teacher.findAll({
          where: { TeacherId: userId }
        });
        break;
      case 'Admin':
        userData = await Admin.findAll({
          where: { AdminId: userId }
        });
        break;
      default:
        return res.status(400).json({ message: "Invalid Role" });
    }

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      return res.status(200).json({ data: userData });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  const { userId, password, role } = req.body;
  let userData;
  try {
    switch (role) {
      case 'Student':
        userData = await Student.findOne({
          attributes: ['AdmissionNumber', 'Password'],
          where: {
            AdmissionNumber: userId,
          }
        });
        break;

      case 'Teacher':
        userData = await Teacher.findOne({
          attributes: ['TeacherId', 'Password'],
          where: {
            TeacherId: userId,
          }
        });
        break;

      case 'Admin':
        userData = await Admin.findOne({
          attributes: ['AdminId', 'Password'],
          where: {
            AdminId: userId,
          }
        });
        break;

      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userData.Password === password) {
      // Store user information in the session
      req.session.user = { userId, role };
      console.log(req.session);
      res.status(200).json({ message: 'Login Successful', userData: userData, role: role });
    } else {
      res.status(201).json({ message: 'Password not matched' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/s', authenticateUser,studentRoute);

// Use authorizeTeacher middleware only for '/t' route
app.use('/t', authorizeTeacher, TeacherRoute,);

app.use('/projects', ProjectRoute,);

// Sync the model with the database and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing models:", error);
  });
