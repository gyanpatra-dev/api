
require('dotenv').config()
import express from 'express';
import cors from 'cors'
const app = express();


//files import

import router from './routes/user.routes';
import authrouter from './routes/auth.routes';


//middlewares

app.use(cors())
app.use(express.json());



// routes

app.use("/api/user",router);
app.use("/api/user/auth",authrouter);





app.listen(process.env.PORT || 6000,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`);
})



