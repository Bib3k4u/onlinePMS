const express = require("express");
const router = express.Router();

const sequelize = require("./../sequelize");
const { Sequelize, Op } = require("sequelize");

const multer = require("multer");
const xlsx = require("xlsx");
const Student = require("../models/StudentList");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Project = require("./../models/ProjectList")(sequelize);
const ProjectMember = require("./../models/ProjectMember")(sequelize);
const isAbleToCreateProject = async (admissionNumber) => {
  try {
    const value = await ProjectMember.findAll({
      attributes: ["ProjectID"],
      where: {
       StudentID: admissionNumber,
      },
    });
    
    return value; // Assuming you want to return the result
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught elsewhere if needed
  }
};

// router.get('/testingFunction', async (req, res) => {
//   try {
//     const data = await isAbleToCreateProject('20SCSE1010340');
//     console.log(data);
//     res.send(data); // Assuming you want to send the result as a response
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error'); // Handle the error appropriately
//   }
// });

// Function to get the current year and semester
const getLastProjectId = async (year, semester) => {
  try {
    const columnName = "ProjectID";
    const value = `BT${year}${semester}`;

    // Use await directly on Project.findAll
    const projects = await Project.findAll({
      attributes: [columnName],
      where: {
        [columnName]: {
          [Op.startsWith]: value,
        },
      },
      order: [[columnName, "DESC"]],
      limit: 1,
    });

    // Log the result for debugging
    console.log(projects.length);

    // If no projects are found, return a default value
    if (projects.length === 0) {
      console.log("if block is executed");
      return `BT${year}${semester}10`; // Adjust the default value as needed
    }
    const temp =
      parseInt(
        projects[0][columnName].substring(4, projects[0][columnName].length)
      ) + 1;
    return `${projects[0][columnName].substring(0, 4)}${temp.toString()}`;
  } catch (error) {
    console.error("Error fetching projects:", error);
    // Handle the error appropriately, for example, you can throw the error
    throw error;
  }
};

router.get("/allProjects", async (req, res) => {
  try {
    const students = await Project.findAll();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { year, semester, admissionNumber } = req.body;
    const{userId} = req.user;
    // console.log(user);
    console.log(userId);
    const data = await isAbleToCreateProject(admissionNumber);
    if(data.length>0)
    {
      return res.status(501).json({message:'You are already registered with group id',projectId:data})
    }
    // Assuming you have a function to get the current year and semester
    const tempValue = await getLastProjectId(year, semester);
    const project = await Project.create({
      ProjectID: tempValue,
      ProjectNumber: tempValue.substring(4, tempValue.length),
      GuideID: "GUSCSE1010339",
      ReviewerID: "GUSCSE1010339",
      CurrentStatus: "Pending",
      Year: year,
      Semester: semester,
    });

    const group = await ProjectMember.create({
      ProjectID: tempValue,
      StudentID: admissionNumber,
      Review1Marks: "0",
      Review2Makrs: "0",
      CurrentStatus: "registered by self",
      Addby:userId===admissionNumber?'Self':temp=async()=>{
        const d = await Student.findAll({
          attributes:["Name"],
          where:{
            AdmissionNumber:admissionNumber
          }
        }).then((d)=>{
          return d;
        })
        
      }
      // Add other group details as needed
    });

    res.json({ message: "Project and group created successfully", tempValue });
  } catch (error) {
    console.error("Error creating project and group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/addStudnets/:projectID", async (req, res) => {
  const projectID = req.params.projectID;
  const { admissionNumber } = req.body;
  try {
    const member = await ProjectMember.create({
      ProjectID: projectID,
      StudentID: admissionNumber,
      Review1Marks: "0",
      Review2Makrs: "0",
      CurrentStatus: "registered by self",
    }).then((member) => {
      res.status(200).json({ message: "Student add successfully" });
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(404).json({ error: error });
  }
});
router.post("/addprojectTitle/:projectID", async (req, res) => {
  const projectId = req.params.projectID;
  const { title, abstract } = req.body;

  try {
    const [updatedRows] = await Project.update(
      {
        ProjectTitle: title,
        ProjectAbstract: abstract
      },
      {
        where: { ProjectID: projectId }
      }
    );

    console.log(updatedRows);

    if (updatedRows > 0) {
      res.status(200).json({ message: "Data added successfully",title,abstract });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
