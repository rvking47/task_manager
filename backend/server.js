import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./config/bd.js";
import userRouter from "./routes/userRoutes.js";
import route from "./routes/serverRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
const app=express();

const port=process.env.PORT || 4000;

//middlweare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Connect DB
connectDB();

//route
app.use(route)
app.use("/api/user", userRouter)
app.use("/api/task",taskRouter);

app.listen(port, ()=>{
    console.log(`server is running localhost:${port}`)
})