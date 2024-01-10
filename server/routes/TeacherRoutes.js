const express = require("express");
const router = express.Router();

const sequelize = require("./../sequelize");
const { Sequelize, Op } = require("sequelize");

const multer = require("multer");
const xlsx = require("xlsx");
const ProjectMember = require("../models/ProjectMember")(sequelize);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Teacher = require("./../models/Teacher")(sequelize);
const Project = require('./../models/ProjectList')(sequelize);

router.get("/allTeacher", async (req, res) => {
  try {
    const students = await Teacher.findAll();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new student
router.post("/teacherDataUpload", upload.single("file"), async (req, res) => {
  try {
    let data;

    if (req.file) {
      const buffer = req.file.buffer;
      const wb = xlsx.read(buffer, { type: "buffer" });
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      data = xlsx.utils.sheet_to_json(sheet);
    } else if (req.body) {
      // Use the data from req.body if no file is uploaded
      data = [req.body];
      console.log(data);
    } else {
      throw new Error("No data provided");
    }

    await sequelize.sync();

    await Promise.all(
      data.map(async (row) => {
        try {
          const [teacher, created] = await Teacher.findOrCreate({
            where: { TeacherID: (row.AdmissionNumber?row.AdmissionNumber:row.TeacherID)},
            defaults: {
              Name: row.Name,
              Phone: row.Phone,
              Email: row.Email,
              Cabin: row.Cabin,
            },
          });
          console.log(teacher);
          // if (!created) {
          //   console.log(`Entry with enrollment number ${row.enrollmentNumber} already exists. Skipping.`);
          // }
        } catch (error) {
          console.error("Error adding student:", error);
        }
      })
    );

    res.json({ message: "Data uploaded successfully" });
  } catch (error) {
    console.error("Error adding students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Endpoint to update the update the student data;
router.put("/updateTeacherData/:teacherId", async (req, res) => {
  try {
    const teacherID = req.params.teacherId;
    const updatedData = req.body;
    const student = await Teacher.update(updatedData, {
      where: { TeacherID: teacherID },
    });

    res.status(200).json({ message: "Teacher data updated" });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

//End point to Delete the Studnet Data
router.delete("/dlt-teacher/:teacherId", async (req, res) => {
  const teacherID = req.params.teacherId;
  try {
    const st = await Teacher.destroy({
      where: { TeacherID: teacherID },
    });

    if (st === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/updateMarks/:projectID", async (req, res) => {
  const projectId = req.params.projectID;
  const { marks, admissionNumber, examName } = req.body;
  console.log(examName);

  try {
    const [updatedRow] = await sequelize.query(
      `UPDATE ProjectMembers SET ${examName} = :marks WHERE ProjectID = :projectId AND StudentID = :admissionNumber;`, {
      replacements: {
        marks,
        projectId,
        admissionNumber,
      },
    });

    console.log(updatedRow);

    if (updatedRow) {
      return res.status(200).json({ message: "Marks updated successfully" });
    }
    res.status(404).json({ message: "Unable to update" });
  } catch (error) {
    console.error("Error updating marks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get('/guideProjects/:guideID',async(req,res)=>{
  const guideId = req.params.guideID;

  try{
    const response = await Project.findAll({
        attributes:['ProjectID'],
        where:{
          GuideID:guideId,
        }
    })
    if(response.length>0)
    {
      return res.status(200).json(response);
    }
    res.status(401).json({message:'Data not found'});

  }catch(error)
  {
    res.status(500).json({message:'Internal server error'})
  }
})
router.get('/reviewProjects/:reveiwerId',async(req,res)=>{
  const reveiwerId = req.params.reveiwerId;

  try{
    const response = await Project.findAll({
        attributes:['ProjectID'],
        where:{
          ReviewerID:reveiwerId,
        }
    })
    if(response.length>0)
    {
      return res.status(200).json(response);
    }
    res.status(401).json({message:'Data not found'});

  }catch(error)
  {
    res.status(500).json({message:'Internal server error'})
  }
})

module.exports = router;
