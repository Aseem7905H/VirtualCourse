import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './config/connectDb.js';
import cookieParser from 'cookie-parser';
import authRouter from './route/authRoute.js';
import userRouter from './route/userRoute.js';
import cors from 'cors';
import courseRouter from './route/courseRoute.js';

const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:  "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use((req, res, next) => {
  console.log("👉 Incoming:", req.method, req.url);
  next();
});

app.use("/api/auth", authRouter) 
app.use("/api/user", userRouter) // Assuming you have a userRouter for user-related routes
app.use("/api/course", courseRouter) // Assuming you have a courseRouter for course-related routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();  

});

