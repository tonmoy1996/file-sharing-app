const fs = require('fs');

const unlinkFile=(path)=>{
    
    fs.stat(path,(err,stats)=>{
        if(err) console.log(err);

        fs.unlink(path,(err)=>{
            if(err) return "Error Occoured";
            return "Removed Successfully";
        })
    })
}

module.exports= {
    unlinkFile
}