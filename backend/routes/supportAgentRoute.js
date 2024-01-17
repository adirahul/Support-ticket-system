import express from "express";
import { createAgentController } from "../controllers/supportAgentController.js";

const router = express.Router();

router.post('/create-agent',createAgentController);

export default router;