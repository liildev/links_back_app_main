import { Router } from "express";
import usersRouter from "./users.js";
import linksRouter from "./links.js";

const router = new Router();

router.use("/users", usersRouter);
router.use("/links", linksRouter);

export default router;
