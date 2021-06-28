const request = require("request-promise");
const user = require("../models/userModel");

exports.create = (req, res) => {
  try {
    const { customer, value, dueDate, description } = req.body;
    
    console.log(req.params.userId)
    //get id custom
    user.findById() 

  
  } catch (e) {
    console.log(e);
  }
};
