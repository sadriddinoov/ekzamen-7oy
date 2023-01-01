import { Router } from "express";
import eventController from "../controller/event.controller.js"
import validate from "../middleware/validate.js";


const router = Router();

router.post("/events", validate, eventController.POST);
router.get("/event/:token", eventController.QUEYRY)


export default router;
