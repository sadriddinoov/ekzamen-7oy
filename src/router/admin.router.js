import { Router } from "express";
import adminController from "../controller/admin.controller.js"
import validate from "../middleware/validate.js";


const router = Router();

router.post("/admins", validate, adminController.LOGIN)


export default router;