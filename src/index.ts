
require('dotenv').config()
import express from 'express';
import cors from 'cors'
const app = express();

import path from 'path';

console.log("User routes resolved path:", path.resolve('./routes/user.routes.ts'));
console.log("Auth routes resolved path:", path.resolve('./routes/auth.routes.ts'));




//files import

import router from './routes/userrouter';
import authrouter from './routes/authrouter';




//middlewares

app.use(cors())
app.use(express.json());



// routes

app.use("/api/user",router);
app.use("/api/user/auth",authrouter);





app.listen(process.env.PORT || 6000,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`);
})



