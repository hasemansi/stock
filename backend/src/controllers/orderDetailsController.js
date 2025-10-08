import OrderDetails from "../models/orderDetails.js";

// Get all order details
export const getAllOrderDetails = async (req, res) => {
  try {
    const details = await OrderDetails.find()
      .populate({
        path: "order",
        populate: [
          { path: "department", select: "name" },
          { path: "supplier", select: "name company GST_code" },
          { path: "products.product", select: "name price" }
        ]
      });

    const filtered = details.filter(d => d.order); // remove null orders
    res.status(200).json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get order details by order number
export const getOrderDetailsByNumber = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    if (!orderNumber) return res.status(400).json({ message: "Order number required" });

    const details = await OrderDetails.find()
      .populate({
        path: "order",
        match: { orderNumber },
        populate: [
          { path: "department", select: "name" },
          { path: "supplier", select: "name company GST_code" },
          { path: "products.product", select: "name price" }
        ]
      });

    const filtered = details.filter(d => d.order);
    if (!filtered.length) return res.status(404).json({ message: "No order details found" });

    res.status(200).json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
