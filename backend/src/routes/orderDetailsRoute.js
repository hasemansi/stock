import express from "express";
import { getAllOrderDetails, getOrderDetailsByNumber } from "../controllers/orderDetailsController.js";

const router = express.Router();

router.get("/", getAllOrderDetails); // fetch all
router.get("/:orderNumber", getOrderDetailsByNumber); // fetch by orderNumber

export default router;
