// schemas.js 
const Joi = require('joi') 

const schema = { 
  cartItem: Joi.object().keys({ 
    user_id: Joi.number().integer().required(),
    product_id: Joi.number().integer().required(),
    price: Joi.number().positive().required(),
  }) 
  // define all the other schemas below 
}; 

module.exports = schema;