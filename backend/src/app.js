import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
const app = express();

const PORT = process.env.PORT || 3001;
import authRoute from './routes/UserRoutes.js';
import cookieParser from 'cookie-parser';


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);

app.listen(PORT, async () => {
    console.log(`server is running on http://localhost:${PORT}`);
    await connectDB();
})