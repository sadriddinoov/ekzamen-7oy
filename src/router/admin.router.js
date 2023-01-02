import { Router } from "express";
import adminController from "../controller/admin.controller.js"
import validate from "../middleware/validate.js";


const router = Router();

router.post("/admins", validate, adminController.LOGIN)
router.put("/admins/:token", adminController.ADMINKA)


export default router;