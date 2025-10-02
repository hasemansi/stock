import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// Routes
import authRoute from './routes/UserRoutes.js';
import collegeRoute from './routes/collegeRoute.js';
import departmentRoute from "./routes/departmentRoute.js";

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
