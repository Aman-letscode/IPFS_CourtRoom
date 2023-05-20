const cases = require('../models/case')
// const 

module.exports.dashboard = async (req,res) =>{
    let user = req.params.id;
    // let user  = req.body.id;
try{

    const data = await cases.find({_id: user});
    // if(data.length>0){
        res.json({data:data[0]});
    // }

    
}catch(e){
    next(e);
}
    
}
