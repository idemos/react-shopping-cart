const Joi = require('joi');

function validateCart(cart){
    const schema = {
        user_id: Joi.number().required(),
        product_id: Joi.number().required(),
        price: Joi.number().required()
    }

    return Joi.validate(cart, schema);
}

exports.validateCart = validateCart;