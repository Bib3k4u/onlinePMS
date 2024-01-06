const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./sequelize");
const { Sequelize, Op } = require("sequelize");

const Student = require("./models/StudentList")(sequelize);
const Teacher = require("./models/Teacher")(sequelize);
const Project = require("./models/ProjectList")(sequelize);
const Task = require("./models/Task")(sequelize);
const ProjectMember = require("./models/ProjectMember")(sequelize);

const studentRoute = require('./routes/StudentRoutes');
const TeacherRoute = require('./routes/TeacherRoutes');
const ProjectRoute = require('./routes/ProjectRoutes');
const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/s',studentRoute);

app.use('/t',TeacherRoute);
app.use('/projects',ProjectRoute);



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
