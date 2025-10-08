import express from "express";
import { createInwardEntry, getAllInwardEntries } from "../controllers/inwardEntryController.js";

const router = express.Router();

router.post("/", createInwardEntry);
router.get("/", getAllInwardEntries);

export default router;
