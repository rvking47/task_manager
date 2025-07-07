import Task from "../model/taskModel.js";

//create a new task 

async function createTask(req,res) {
    try{
        const {title, description, priority, dueDate, completed}= req.body;
        const task=new Task({title,
            description,
            priority,
            dueDate,
            completed: completed === 'Yes' || completed === true,
            owner: req.user.id
        });
        const saved=await task.save();
        res.status(201).json({success: true, task: saved});
    }
    catch(error)
    {
   res.status(400).json({success: false, message: error.message});
    }
}

//Get all task  for logged - in User

async function getTask(req,res) {
    try{
     const tasks=await Task.find({owner: req.user.id}).sort({createdAt: -1});
     res.json({success: true, tasks});
    }
    catch(error)
    {
     res.status(500).json({success: false, message: error.message});
    }
}

//Get single task by id (Must belong to that user)

async function getTaskbyId(req,res) {
    try{
        const task=await Task.findOne({_id: req.params.id, owner: req.user.id});
        if(!task)
        {
            return res.status(404).json({success: false, message: "Task not found"});
        }
        res.json({success: true, task});
    }
    catch(error)
    {
        res.status(500).json({success: false, message: error.message});
    }
}

//Update a task

async function updateTask(req,res) {
    try{
         const data= {...req.body};
         if(data.completed !== undefined)
         {
            data.completed= data.completed === 'Yes' || data.completed === true;
         }
         const updated=await Task.findOneAndUpdate(
            {_id: req.params.id, owner: req.user.id},
            data,
            {new: true, runValidators: true}
        );
        if(!updated) return res.status(400).json({
            success: false, message: "Task not found or not yours"
        });
        res.json({success: true, task: updated});
    }
    catch(error)
    {
      res.status(400).json({success: false, message: error.message});
    }
}

//Delete a task

async function deleteTask(req,res){
    try{ 
       const deleted= await Task.findOneAndDelete({_id: req.params.id, owner: req.user.id});
       if(!deleted)
       {
        return res.status(404).json({success: false, message: "Task not found or not yours"})
       }
       res.json({success: true, message: "Task deleted"});
    }
    catch(error)
    {
       res.status(500).json({success: false, message: error.message});
    }
}
export {createTask,getTask,getTaskbyId,updateTask,deleteTask};