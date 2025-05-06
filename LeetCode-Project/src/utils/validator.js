const validator = require("validator");
const validate = (data) => {
  const mandatoryField = ["firstName", "emailId", "password"];

  const isAllowed = mandatoryField.every((k = Object.keys(data).includes(k)));

  if(!isAllowed){
    throw new Error("some field missing")
  }
  if(!validator.isEmail(data.emaild)){
    throw new Error("Invalid Email")
  }

  if(!validator.isStrongPassword(data.password)){
    throw new Error ("week password")
  }

};

module.exports = validate;
