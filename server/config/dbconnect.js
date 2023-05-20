const mongoose = require('mongoose')

const connect = async (url) => {
    try{
        const db_opt = {
            dbname: "CourtRoom"
        }
        
        //Connection with mongodb
        await mongoose.connect(url,db_opt)

            console.log(`Connected Successfully with ${db_opt.dbname}`);
        
    }catch(err){
        console.log(`Error Detected:${err}`)
    }
}

module.exports = connect;
