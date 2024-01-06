const express = require('express');
const router = express.Router();

const sequelize = require("./../sequelize");
const { Sequelize, Op } = require("sequelize");

const multer = require("multer");
const xlsx = require("xlsx");
const Student = require('../models/StudentList');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Project = require("./../models/ProjectList")(sequelize);
const ProjectMember = require('./../models/ProjectMember')(sequelize);

// Function to get the current year and semester
const getLastProjectId = async (year, semester) => {
  try {
    const columnName = 'ProjectID';
    const value = `BT${year}${semester}`;

    // Use await directly on Project.findAll
    const projects = await Project.findAll({
      attributes: [columnName],
      where: {
        [columnName]: {
          [Op.startsWith]: value,
        },
      },
      order: [[columnName, 'DESC']],
      limit: 1,
    });

    // Log the result for debugging
    console.log(projects.length);

    // If no projects are found, return a default value
    if (projects.length == 0) {
      console.log('if block is executed')
      return `BT${year}${semester}10`; // Adjust the default value as needed
    }
   const temp = parseInt(projects[0][columnName].substring(4,projects[0][columnName].length))+1;
   return `${projects[0][columnName].substring(0,4)}${temp.toString()}`;

  } catch (error) {
    console.error('Error fetching projects:', error);
    // Handle the error appropriately, for example, you can throw the error
    throw error;
  }
};

router.get("/allProjects", async (req, res) => {
  try {
    const students = await Teacher.findAll();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/create', async (req, res) => {
  try {
    const {year,semester,admissionNumber} = req.body;
    // Assuming you have a function to get the current year and semester
    const tempValue = await getLastProjectId(year, semester);
   const project = await Project.create({
        ProjectID:tempValue,
        ProjectNumber:tempValue.substring(4,tempValue.length),
        GuideID:'GUSCSE1010339',
        ReviewerID:'GUSCSE1010339',
        CurrentStatus:'Pending',
        Year:year,
        Semester:semester,
      });

      const group = await ProjectMember.create({
        ProjectID:tempValue,
        StudentID:admissionNumber,
        Review1Marks:'0',
        Review2Makrs:'0',
        CurrentStatus:'registered',
        // Add other group details as needed
      });

    res.json({ message: 'Project and group created successfully', tempValue });
  } catch (error) {
    console.error('Error creating project and group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/addStudnets/:projectID',async(req,res)=>{
    const projectID= req.params.projectID;
    const{admissionNumber}=req.body;
    try {
        const member = await ProjectMember.create({
            ProjectID:projectID,
            StudentID:admissionNumber,
            Review1Marks:'0',
            Review2Makrs:'0',
            CurrentStatus:'registered by self',
        
        }).then((member)=>{
            res.status(200).json({message:'Student add successfully'})
        });

      } catch (error) {
        console.error("Error adding student:", error);
        res.status(404).json({error:error});
      }
})

module.exports = router;
