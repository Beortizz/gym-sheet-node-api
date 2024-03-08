import express from "express";
import { getStudents } from "../controllers/StudentController";
import { getStudent } from "../controllers/StudentController";
import { createStudent } from "../controllers/StudentController";
import { updateStudent } from "../controllers/StudentController";
import { deleteStudent } from "../controllers/StudentController";


const router = express.Router();

router.get("/students", getStudents);
router.get("/students/:id", getStudent);
router.post("/students", createStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

router.get("/exercises", getExercises);


export default router;
