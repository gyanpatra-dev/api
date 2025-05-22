require("dotenv").config();
import express from "express";
import cors from "cors";
const app = express();

//files import

import userrouter from "./routes/UserRoutes/userrouter";
import authrouter from "./routes/AuthRoutes/authrouter";
import adminrouter from "./routes/AdminRoutes/admin.router";
import branchrouter from "./routes/BranchRoutes/branchroute";
import yearrouter from "./routes/yearRoutes/yearrouter";
import subjectrouter from "./routes/subjectRoutes/subjectRouter";
import pyqrouter from "./routes/pyqRoutes/pyqroutes";
import notesrouter from "./routes/NotesRoutes/notesrouter";
import videorouter from "./routes/VideoRoutes/videoroute";

//middlewares

app.use(cors());
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.json({
    message: "Welcome To IITKIRBA Api",
    author:"@gyanpatra.dev"
  });
});

app.use("/api/user", userrouter);
app.use("/api/admin", adminrouter);
app.use("/api/user/auth", authrouter);
app.use("/api/branch", branchrouter);
app.use("/api/year", yearrouter);
app.use("/api/subject", subjectrouter);
app.use("/api/pyq", pyqrouter);
app.use("/api/notes", notesrouter);
app.use("/api/videos",videorouter)

app.listen(process.env.PORT || 6000, () => {
  console.log(`server is running at http://localhost:${process.env.PORT}`);
});
