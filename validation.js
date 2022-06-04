//Validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    login: Joi.string().min(4).required(),
    email: Joi.string().min(4).required().email(),
    firstName: Joi.string().min(4).required(),
    lastName: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
  });

  return schema.validate(data);
};

//loginValidation Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    login: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
