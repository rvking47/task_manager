import authMidlleare from "../middleware/auth.js";
import express from "express";
import { createTask, deleteTask, getTask, getTaskbyId, updateTask } from "../controller/taskController.js";

const taskRouter=express.Router();

taskRouter.route('/gp')
.get(authMidlleare, getTask)
.post(authMidlleare, createTask);

taskRouter.route('/:id/gp')
.get(authMidlleare, getTaskbyId)
.put(authMidlleare, updateTask)
.delete(authMidlleare, deleteTask);

export default taskRouter;