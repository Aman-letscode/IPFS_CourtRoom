//Importing the models
const messages = require("../models/message");
const CircularJSON = require("circular-json");

module.exports.insertMessage = (data) => {
  const msg = new messages({
    msg_id: data.body,
    content: data.body,
    user_id: data.user_id,
    case_id: data.case_id,
    role: "lawyer",
  });
  msg.save();
  const saved = messages.findOne({ msg_id: data });

  if (saved) {
    return true;
  } else {
    return false;
  }
};


