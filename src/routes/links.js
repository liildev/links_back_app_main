import { Router } from "express";
import controller from "../controllers/links.controller.js";
import auth from "../middlewares/auth.middleware.js";
import validation from "../middlewares/validation.js";
const router = new Router();

router.get("/", auth, controller.GET);
router.get("/:id", auth, controller.GET);

router.post("/generate", auth, validation, controller.GENERATE);

export default router;
