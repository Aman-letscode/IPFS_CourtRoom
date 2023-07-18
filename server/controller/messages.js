//Importing the models
const messages = require("../models/message");





const insertMessage = (data) => {
  console.log(data);
  const msg = new messages({
    msg_id: data.body,
    content: data.body,
    user_id: data.user_id,
    case_id: data.case_id,
    
    // time: new Date().toLocaleString(),
    role: "lawyer",
  });
  msg.save();

  var currentdate = new Date(); 

  const ampm = currentdate>=12 ? 'PM' : 'AM';
var datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + ", " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds()+" "+ampm;
// console.log(currentdate.today(+ " " + currentdate.timeNow()))


  console.log(datetime);
    
    // const saved = promise1.then(value=> JSON.stringify(value))
    const saved = messages.findOne({ msg_id: data.body }).lean();
  
  // console.log(json);
  const details ={
    msg_id : data.body,
    content: data.body,
    user_id: data.user_id,
    case_id: data.case_id,
    time: datetime,
    role: "lawyer",
  }
  console.log(details);
  if (saved) {
    // console.log(saved._id)
    // saved["time"] = datetime;
    return details;
  } else {
    return null;
  }
};


module.exports = insertMessage;  


