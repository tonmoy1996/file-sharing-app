const mongoose= require("mongoose");

function connectDB(){

    mongoose.connect("rmongodb+srv://tonmoy1996:catkin08@cluster0.bd32z.mongodb.net/fileShae?retryWrites=true&w=majority",{useNewUrlParser: true,
        useUnifiedTopology: true});

    const connection= mongoose.connection;

    connection.once('open',()=>{
        console.log("Database Connected");
    });
}

module.exports= connectDB;