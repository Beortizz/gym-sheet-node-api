import express from "express";
import * as StudentController from "../controllers/StudentController";
import  * as ExercisesController  from "../controllers/ExercisesController";
import * as TrainingSheetController from "../controllers/TrainingSheetController";
import * as AuthController from "../controllers/AuthController";
import { authenticateToken } from "../middlewares/authMiddleware"; 




const router = express.Router();
const routerWithAuth = express.Router();
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

routerWithAuth.use(authenticateToken);
router.use("", routerWithAuth);
routerWithAuth.get("/students", StudentController.getStudents);
routerWithAuth.get("/students/:id", StudentController.getStudent);
routerWithAuth.post("/students", StudentController.createStudent);
routerWithAuth.put("/students/:id", StudentController.updateStudent);
routerWithAuth.delete("/students/:id", StudentController.deleteStudent);

routerWithAuth.get("/exercises", ExercisesController.getExercises);
routerWithAuth.get("/exercises/:id", ExercisesController.getExercise);
routerWithAuth.post("/exercises", ExercisesController.createExercise);
routerWithAuth.put("/exercises/:id", ExercisesController.updateExercise);
routerWithAuth.delete("/exercises/:id", ExercisesController.deleteExercise);

routerWithAuth.get("/training-sheets", TrainingSheetController.getTrainingSheets);
routerWithAuth.get("/training-sheets/:id", TrainingSheetController.getTrainingSheet);
routerWithAuth.post("/training-sheets", TrainingSheetController.createTrainingSheet);
routerWithAuth.put("/training-sheets/:id", TrainingSheetController.updateTrainingSheet);
routerWithAuth.delete("/training-sheets/:id", TrainingSheetController.deleteTrainingSheet);


export default router;
