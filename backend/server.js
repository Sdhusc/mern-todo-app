const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")

require("dotenv").config();

const app=express();

const authRoutes=require("./Routes/authRoutes.js");
const taskRoutes=require("./Routes/taskRoutes.js");

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>
{
    console.log("MDB CONEECTED");
    app.listen(5000,()=>
    {
        console.log("SERVER RUNNING ON PORT 5000");
    })
})
.catch((err)=>
{
    console.log("ERROR CONNECTING MDB",err)
})