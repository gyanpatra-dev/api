import { Router } from "express";
const router =  Router()


import { hello } from "../controller/user.controller";


router.get("/",hello)

export default router