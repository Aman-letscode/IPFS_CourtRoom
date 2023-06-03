const express = require('express')
const router = express.Router();
const path = require('path')

//Controllers
const register = require('../controller/register')
const {upload,uploadIPFS} = require('../controller/file')
const admin = require('../controller/admin')
const dashbroad = require('../controller/dashboard')

//Models
const User = require("../models/users");
const Case = require("../models/case");
const Messages = require("../models/message")


//GET Request:


//For Testing
router.get("/",(req,res)=>{
    res.send("Hello");
    // res.sendFile(path.join(__dirname,'../src/index.html'));
})

//For posting judge and lawyer list as response
router.get("/addCase",admin.PostData);

//For all cases
router.get("/case", async (req,res)=>{
  try{
  // Find the user by their ID
  
  // If the user doesn't exist, return an error

  // Retrieve the cases associated with the user
  const cases = await Case.find();
  console.log(cases);
  // Extract the case IDs from the cases
  const caseIds = cases.map((c) => c);

  // Return the case IDs
  res.json(cases);
} catch (err) {
  console.error("Error retrieving case IDs:", err);
  res.status(500).json({ error: "Internal server error" });
}

});


//For posting case list according to user
router.get("/case/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find the user by their ID
      const user = await User.findOne({ user_id: userId });
  
      // If the user doesn't exist, return an error
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Retrieve the cases associated with the user
      const cases = await Case.find({ users: userId });
  
      // Extract the case IDs from the cases
      const caseIds = cases.map((c) => c);
  
      // Return the case IDs
      res.json({ caseIds });
    } catch (err) {
      console.error("Error retrieving case IDs:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

//For posting message list according to case
router.get("/messages/:caseId",async (req, res) => {
    try {
        const { caseId } = req.params;
        console.log("yes")
  
      // Find the chat room associated with the case
      const Message = await Case.findOne({ case_id: caseId });
  
      // If the chat room doesn't exist, return an error
      if (!Message) {
        return res.status(404).json({ error: "Chat room not found" });
      }
  
      // Retrieve the messages associated with the case
      const messages = await Messages.find({ case_id: caseId });
      // Extract the case IDs from the cases
      // const allmessages = messages.map((c) =>{
      //   console.log(c);
      //   return c;
      // });


      const allmessages = messages.map((c) => {
        c["time"] = new Date(c._id.getTimestamp()).toLocaleString("en-US");
        return c;
      } );
  
      // console.log(allmessages)
      // Return the messages
      return res.json({ allmessages });
    } catch (err) {
      console.error("Error retrieving messages:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });


//Post Request:


router.post("/register",register.register);
//For Login: req.body -> user_id, password
router.post("/login",register.login);
 
//For Uploading File: req.body -> file,uses ipfs
router.post('/upload', upload.single('file'),async (req,res)=>{
    
    try{
      
      console.log(req.file.originalname);
      // const address = req.file.originalname;
      const address = req.file.destination + req.file.originalname;
      // let link = '';
  console.log(address);
      const adr = await uploadIPFS(address);
      console.log(adr[0].path);
      
      res.status(200).json({status:'success',link:adr[0].path});
    } 
    catch(e){
      
      console.log(e);
      res.status(500).json({status:'failed',link:'not uploaded',});
    }

    
  })
  
//For Adding Case (Only for admin): req.body: caseNo, judge, lawyer1, lawyer2
router.post("/addCase",admin.addCase);


// router.get('/dashboard/:userId',dashbroad);


  



module.exports = router;