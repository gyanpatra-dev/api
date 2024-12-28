import { Router } from "express";
const branchrouter = Router()
import { getallbranch } from "../../controller/BranchController/branch.controller";




branchrouter.get("/", getallbranch)


export default branchrouter