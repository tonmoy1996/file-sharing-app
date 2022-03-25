require("dotenv").config()
const express= require("express");
const app= express()
const port= process.env.PORT
const apiRoute=require("./routes/api");

//Database Connect
require("./config/db")();

//middleware

app.use(express.json());
app.use(express.urlencoded({extended: false}));


//register Routes

app.use("/api/files",apiRoute );




app.listen(port,()=>{
    console.log(`Listening at ${port}`);
})
