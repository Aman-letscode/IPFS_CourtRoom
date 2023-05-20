const messages = require('./models/message')
// const 
const cases = require('./models/case')
const users = require('./models/users')
const CircularJSON = require('circular-json')
const insertMessage = (data) =>{
    const msg = new messages({
        msg_id: data.body,
        content: data.body,
        user_id: data.user_id,
        case_id: data.case_id,
        role: "lawyer"
    })
    msg.save()
    const saved = messages.findOne({ msg_id: data });
    
            if (saved) {
            
            return true;
            } else {
            
            return false;
            }
}

const pastMessages = (caseId) =>{
     // Retrieve the messages associated with the case
     const messag = messages.find({ case_id: caseId }).lean();
  console.log(CircularJSON.stringify(messag));
     // Extract the case IDs from the cases
    //  const allmessages = messag.map((c) => c);
 return messag;
} 

module.exports = {insertMessage,pastMessages};