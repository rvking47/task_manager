import mongoose from "mongoose";

async function connectDB() {
    try{
        await mongoose.connect('mongodb+srv://rvimal358:mUrkt9NlBK3PN8Hp@cluster0.lvnsjkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected SuccessFully!!");
    }
    catch(error)
    {
      console.log("DataBase is not Connected");
      console.log(error);
    }
}

export default connectDB;