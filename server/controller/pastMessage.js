const messages = require('./models/message')
const CircularJSON = require('circular-json')

module.exports.pastMessages = (caseId) =>{
    // Retrieve the messages associated with the case
    const messag = messages.find({ case_id: caseId }).lean();
 console.log(CircularJSON.stringify(messag));
 console.log(messag);
    // Extract the case IDs from the cases
   //  const allmessages = messag.map((c) => c);
    return messag;
} 
