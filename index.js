const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT
// const allowedorigins = ['http://127.0.0.1']
require("./config/config");
// const user_model = require("./model/User");
// const role_model = require("./model/RoleDefination");
const userRouter = require("./routes/UserRouter")
const roleRouter = require("./routes/RoleRouter")
const crdntrouter = require("./routes/Coordinate")

const app = express();
app.use(express.json());

app.use(cors({
    origin:["http://127.0.0.1"],
    optionsSuccessStatus: 200
}))

app.get('/home', (req, res)=>{
    // console.log("endpoint hit successful...");
    res.json({message:"this is the homepage..."})
})
app.use('/api', userRouter);
app.use('/api', roleRouter);
app.use('/api', crdntrouter);

app.listen(port, ()=>{
    console.log("server is running on the port - ",port);
})