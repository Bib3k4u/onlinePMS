const express = require('express');
const router = express.Router();

const sequelize = require("./../sequelize");
const { Sequelize, Op } = require("sequelize");

const multer = require("multer");
const xlsx = require("xlsx");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Student = require("./../models/StudentList")(sequelize);

router.get("/allStudents", async (req, res) => {
    try {
      const students = await Student.findAll();
      res.json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  router.get('/student/:admissionNumber',async (req,res)=>{
    const admissionNumber = req.params.admissionNumber;
    try{
      const stData = await Student.findAll({
        where:{AdmissionNumber:admissionNumber}
      })
      res.status(200).json({studentData:stData});
    }catch(error)
    {

      res.status(400).json({error:"error encountered while fetching"})
    }
  })
  // Add a new student
  router.post("/studentDataUpload", upload.single("file"), async (req, res) => {
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
            const maxStudentID = await Student.max('StudentID');
            const [student, created] = await Student.findOrCreate({
              where: { AdmissionNumber: row.AdmissionNumber },
              defaults: {
                EnrollmentNumber: row.EnrollmentNumber,
                Name: row.Name,
                Branch: row.Branch,
                Year: parseInt(row.Year),
                Semester: parseInt(row.Semester),
                Phone: row.Phone,
                Email: row.Email,
                Course: row.Course,
                Session: row.Session,
                StudentID: maxStudentID?maxStudentID+1:1,
              
              },
            });
            // console.log(student);
            if(!student)
            {
              return res.status(400).json({message:'something went wrong'});
            }
  
            // if (!created) {
            //   console.log(`Entry with enrollment number ${row.enrollmentNumber} already exists. Skipping.`);
            // }
          } catch (error) {
            console.error("Error adding student:", error);
          }
        })
      )
  
      res.json({ message: "Data uploaded successfully" });
    } catch (error) {
      console.error("Error adding students:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  //Endpoint to update the update the student data;
  router.put("/updateStudentData/:admissionNumber", async (req, res) => {
    try {
      const admissionNumber = req.params.admissionNumber;
      const updatedData = req.body;
      const student = await Student.update(updatedData, {
        where: { AdmissionNumber: admissionNumber },
      });
      
      res.status(200).json({ message: "Student data updated" });
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  });
  
  //End point to Delete the Studnet Data
  router.delete('/dltStudent/:admissionNumber', async (req, res) => {
    const admissionNumber = req.params.admissionNumber;
    try {
      const st = await Student.destroy({
        where: { AdmissionNumber: admissionNumber }
      });
  
      if (st === 0) {
        return res.status(404).json({ error: "Record not found" });
      }
  
      res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  



module.exports = router;