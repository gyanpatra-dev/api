import { Router } from "express";
const branchrouter = Router()
import { createmanybranch, getallbranch, updatebranch } from "../../controller/BranchController/branch.controller";
import { createbranch } from "../../controller/BranchController/branch.controller";



branchrouter.get("/", getallbranch)
branchrouter.post("/create",createbranch);
branchrouter.post("/update",updatebranch)
branchrouter.post("/createmany",createmanybranch)


export default branchrouter