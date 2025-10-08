import express from "express";
import { createOutwardEntry, getAllOutwardEntries } from "../controllers/outwardEntryController.js";

const router = express.Router();
router.post("/", createOutwardEntry);
router.get("/", getAllOutwardEntries);

export default router;