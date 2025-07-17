import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js"
import UserRouter from './routes/user.routes.js';
import EmployeeRouter from './routes/employee.route.js';


dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
connectDB();
app.use(express.json());

app.use('/api/auth', UserRouter);
app.use('/api/employees', EmployeeRouter);




app.listen(PORT, ()=>{
    console.log(`the server is running on http://localhost:${PORT}`);
})