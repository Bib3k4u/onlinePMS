const express = require("express");
const router = express.Router();

const sequelize = require("./../sequelize");
const { Sequelize, Op } = require("sequelize");

const multer = require("multer");
const xlsx = require("xlsx");
const Student = require("../models/StudentList")(sequelize);
const ProjectDocument = require("../models/ProjectDocument")(sequelize);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Teacher = require('../models/Teacher')(sequelize);
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
    const { year, semester, admissionNumber,members,user } = req.body;
    
    // console.log(user);
    // console.log(userId);
    const data = await isAbleToCreateProject(admissionNumber);
    if(data.length>0)
    {
      return res.status(501).json({message:'You are already registered with group id',projectId:data})
    }

    // Assuming you have a function to get the current year and semester
    const tempValue = await getLastProjectId(year, semester);
    
    const [guide, reviewer] = await Teacher.findAll({
      order: Sequelize.literal('RAND()'),
      limit: 2,
    });
   
    const project = await Project.create({
      ProjectID: tempValue,
      ProjectNumber:members ,
      GuideID: guide.dataValues.TeacherID,
      ReviewerID:reviewer.dataValues.TeacherID,
      Status: "Pending",
      Year: year,
      Semester: semester,
    });

    const group = await ProjectMember.create({
      ProjectID: tempValue,
      StudentID: admissionNumber,
      Review1Marks: "0",
      Review2Makrs: "0",
      CurrentStatus: "registered by self",
      Addby:user
        
      
      // Add other group details as needed
    });
    const document = await ProjectDocument.create({
      ProjectID:tempValue,
    })
  
    res.status(200).json({ message: "Project and group created successfully", tempValue });
  } catch (error) {
    console.error("Error creating project and group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/addStudnets/:projectID", async (req, res) => {
  const projectID = req.params.projectID;
  const { admissionNumber,user } = req.body;
  const data = await isAbleToCreateProject(admissionNumber);
  if(data.length>0)
  {
    return res.status(501).json({message:'You are already registered with group id',projectId:data})
  }
  console.log(user);
  try {
    const member = await ProjectMember.create({
      ProjectID: projectID,
      StudentID: admissionNumber,
      Review1Marks: "0",
      Review2Makrs: "0",
      CurrentStatus: "registered by self",
      Addby:user
    }).then((member) => {
      res.status(200).json({ message: "Student add successfully" });
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(404).json({ error: error });
  }
});



router.get("/pdSpecific", async (req, res) => {
  const userID = req.query.userID;
  const role = req.query.role;

  try {
    let value;

    if (role === 'Student') {
      const projectId = await ProjectMember.findAll({
        attributes: ['ProjectID'],
        where: {
          StudentID: userID, // Assuming StudentID is the correct field for comparison
        },
      });

      if (projectId.length > 0) {
        value = projectId[0].ProjectID;
      } else {
        return res.status(404).json({ message: "No projects found for the given student" });
      }
    } else {
      value = userID;
    }

    const data = await sequelize.query(
      'SELECT * FROM Projects AS p ' +
      'JOIN ProjectMembers AS pm ON p.ProjectID = pm.ProjectID ' +
      'JOIN Students AS s ON pm.StudentId=s.AdmissionNumber ' +
      'WHERE pm.ProjectID = :ProjectID',
      {
        replacements: { ProjectID: value },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json({ message: "Successfully fetched the data", data });
  } catch (error) {
    console.error("Error while fetching the data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/changeprojectStatus/:projectID", async (req, res) => {
  const projectId = req.params.projectID;
  // const { title, abstract } = req.body;

  try {
    const [updatedRows] = await Project.update(
      {
        Status:'Approved'
      
      },
      {
        where: { ProjectID: projectId }
      }
    );

    

    if (updatedRows > 0) {
      res.status(200).json({ message: "Data added successfully" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/groupData/:projectId',async(req,res)=>{
  const projectId = req.params.projectId;
  try{
  const response = await ProjectMember.findAll({
    where:{ProjectID:projectId}
  });
  if(response)
  {
    res.status(200).json(response);
  }
  }catch(error)
  {
    res.status(501).json({message:'Internal server Error'})
  }
})
//ProjectDocuments

router.get('/allDocument',async(req,res)=>{
  try{
    const response = await ProjectDocument.findAll({});
    if(response)
    {
     return  res.status(200).json(response)
    }
    res.status(401).json({message:'unable to fetch the data'});
  }catch(error)
  {
    res.status(501).json({message:'Internal server Error'});
  }
})

router.get('/documentDetails/:projectID',async(req,res)=>{
     const projectId = req.params.projectID;
     try{
      const response = await ProjectDocument.findAll({
        where:{
            ProjectID:projectId,
        }
      })
      if(response)
      {
        return res.status(200).json(response);
      }
      res.status(401).json({message:'unable to fetch'});
     }catch(error)
     {
        res.status(501).json({message:'Internal server Error'});
     }
})
router.post("/addprojectTitle/:projectID", async (req, res) => {
  const projectId = req.params.projectID;
  const { title, abstract } = req.body;

  try {
    const [updatedRows] = await ProjectDocument.update(
      {
        ProjectTitle: title,
        ProjectAbstract: abstract
      },
      {
        where: { ProjectID: projectId }
      }
    );
    if (updatedRows > 0) {
      res.status(200).json({ message: "Data added successfully",title,abstract });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/addProjectDocuemnt/:projectId',async(req,res)=>{
  const{documentName,Link} = req.body;
  const projectId = req.params.projectId;
  try{
  const [updatedRow] = await sequelize.query(
    `UPDATE ProjectDocuments SET ${documentName} = :Link WHERE ProjectID = :projectId;`, {
    replacements: {
      Link,
      projectId,
    },
  });
  if (updatedRow) {
    return res.status(200).json({ message: "Document updated successfully" });
  }
  res.status(404).json({ message: "Unable to update Document" });
}catch(error)
{console.error("Error updating marks:", error);
res.status(500).json({ error: "Internal Server Error" });console.log('error');
}
})


module.exports = router;
