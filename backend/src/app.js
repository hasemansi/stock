import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// Routes
import authRoute from './routes/UserRoutes.js';
import collegeRoute from './routes/collegeRoute.js';
import departmentRoute from "./routes/departmentRoute.js";
import roleRoute from "./routes/roleRoute.js";
import facultyRoutes from "./routes/facultyRoute.js";
import deptFaculty from './routes/deptFacultyRoutes.js';

import supplierRoutes from "./routes/supplierRoute.js";
import productRoute from "./routes/productRoute.js"
import orderRoute from "./routes/orderRoute.js";
import orderDetailsRoute from "./routes/orderDetailsRoute.js"

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/colleges', collegeRoute);  // ✅ better to mount with /api/colleges
app.use('/api/departments', departmentRoute);
app.use('/api/roles', roleRoute);
app.use('/api/faculties', facultyRoutes);
app.use('/api/deptFaculty', deptFaculty);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoute)
app.use('/api/orders', orderRoute);
app.use('/api/order-details', orderDetailsRoute);

// Connect DB and Start Server
const startServer = async () => {
    try {
        await connectDB();  // connect to MongoDB
        app.listen(PORT, () => {
            console.log(`✅ Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ DB connection failed:", error.message);
        process.exit(1);
    }
};

startServer();
