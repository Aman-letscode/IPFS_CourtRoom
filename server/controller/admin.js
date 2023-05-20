const User = require('../models/users')
const Case = require('../models/case'); 


class Admin{
    static PostData = async (req,res) =>{
        try{
            
            const judge = await User.find({role:'judge'});
            const lawyer = await User.find({role:'lawyer'});
            res.json({"status":"success","judge":judge,"lawyer":lawyer});
        }catch(e){
            console.log(e);
            res.json({"status":"failed","error":e});
        }

    }
    static addCase = async (req,res) =>{
        if(!res.body) return res.json({"status":"failed","error":"No Data found"});
        try{

            const {CaseNo,judge,lawyer1,lawyer2} = req.body;
            const RegisterCase = new Case({
                case_id: CaseNo,
                user_id: [judge,lawyer1,lawyer2],
                status: 'active',
            })
            await RegisterCase.save();
            const saved = await User.findOne({ case_id: CaseNo });

            if (saved) {
              res.json({
                status: "success",
                message: "Case Registration Successful",
              });
            } else {
              res.json({
                status: "failed",
                message: "Case Registration Failed",
              });
            }
            
        }catch(e){
            res.json({"status":"failed","error":e});    
        }

    
    } 
}


module.exports= Admin;