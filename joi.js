const joi = require("joi");
const Card = require("./model/cardSchema");

module.exports.cardSchema = joi.object({
        image: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().min(10).required(),
});