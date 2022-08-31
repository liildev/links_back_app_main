import { Router } from "express";
import controller from "../controllers/redirect.controller.js";
const router = new Router();

router.get("/:code", controller.GET);

export default router;
