require("dotenv").config()
const express= require("express");
const app= express()
const port= process.env.PORT || 3000
const apiRoute=require("./src/routes/index");

//Database Connect
require("./config/db")();

//middleware

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/",(req,res)=>{
    res.send("working");
})

//register Routes
app.use("/api/v1/private",apiRoute);


app.listen(port,()=>{
    console.log(`Listening at ${port}`);
})
