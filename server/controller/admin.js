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
        // if(!res.body) return res.json({"status":"failed","error":"No Data found"});
        console.log(req.body);
        // try{
            
            // const {CaseNo,judge,lawyer1,lawyer2} = req.body;
            const CaseNo = req.body.CaseNo;
            const judge = req.body.judge;
            const lawyer1 = req.body.lawyer1;
            const lawyer2 = req.body.lawyer2;
            const desc = req.body.desc;


console.log([CaseNo,judge,lawyer1,lawyer2])
            const RegisterCase = new Case({
                case_id: CaseNo,
                judge_id: judge,
                laywer1: lawyer1,
                laywer2: lawyer2,
                users: [lawyer1,lawyer2,judge],
                status: 'active',
                caseDescription: desc
            })

            await RegisterCase.save();
            const saved = await Case.findOne({ case_id: CaseNo });
            // console.log(saved.case_id)
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
            
        // }catch(e){
        //     res.json({"status":"failed","message":"Error:","error":e});    
        // }

    
    } 
}


module.exports= Admin;