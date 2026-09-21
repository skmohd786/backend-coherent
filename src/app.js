const express = require("express");
const app = express();
const User = require("./models/user");
const connectDB = require("./config/database");
const seedDemoData = require("./config/seedDemoData");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

require("dotenv").config();

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://fronted-cohorent-two.vercel.app",
    "https://cohorent.me",
    "https://www.cohorent.me",
].filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());       // middleware used to parse the token/JWT from the cookie

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// GET user by email
app.get("/user", async (req,res) => {
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId: userEmail});
        res.send(users);
    } catch(err){
        res.status(400).send("Something went wrong!!");
    }
});

// GET user by Id (params)
app.get("/user/:id", async (req,res) => {
    const userId = req.params.id;

    try{
        const users = await User.findById(userId);
        res.send(users);
    } catch(err){
        res.status(400).send("Something went wrong!!");
    }
});

// GET all user 
app.get("/feed", async (req,res) => {
    try{
        const users = await User.find();
        res.send(users);
    } catch(err){
        res.status(400).send("Something went wrong!!");
    }
});

// DELETE user by id
app.delete("/user", async (req,res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully!!");
    } catch(err){
        res.status(400).send("Something went wrong!!");
    }
});

// UPDATE user by id
app.patch("/user", async (req,res) => {
    const userId = req.body.userId;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = ["userId","photoURL","about","gender","age","photoURL","skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }

        if(data?.skills.length > 3){
            throw new Error("Skills can't be more than 3");
        }

        const user = await User.findByIdAndUpdate(userId, data, {
            runValidators: true,
        });
        res.send("User updated successfully!!");
    } catch(err){
        res.status(400).send("Error :"+ err.message);
    }
});

const port = process.env.PORT || 7777;
server.listen(port, "0.0.0.0", () => {
    console.log(`Server is successfully listening on port ${port}...`);
});

connectDB()
    .then(async () => {
        console.log("Database connection established...");
        await seedDemoData();
    })
    .catch((err) => console.error("Database cannot be connected:", err.message));