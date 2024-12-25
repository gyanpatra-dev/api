
require('dotenv').config()
import express from 'express';
import cors from 'cors'
const app = express();





//files import

import userrouter from './routes/userrouter';
import authrouter from './routes/authrouter';
import adminrouter from './routes/admin.router';




//middlewares

app.use(cors())
app.use(express.json());



// routes

app.get("/",(req,res)=>{
    res.json({
        message: "Welcome To IITKIRBA Api"
    })
})

app.use("/api/user",userrouter);
app.use("api/admin",adminrouter)
app.use("/api/user/auth",authrouter);





app.listen(process.env.PORT || 6000,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`);
})



