import { Router } from "express";
import controller from "../controllers/users.controller.js";
import validation from "../middlewares/validation.js";
const router = new Router();

router.post("/registration", validation, controller.REGISTRATION);
router.post("/login", validation, controller.LOGIN);

export default router;
