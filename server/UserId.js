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
const app = express();
// Function to get the current year and semester


app.get("/", async (req, res) => {
  try {
    
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
