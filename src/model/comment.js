let mongoose = require("mongoose");
const Joi = require('@hapi/joi');

let Schema = mongoose.Schema;

let commentSchema = new Schema(
  { 
    id: {
      type: Number,
    },
    postLId: {
      type: Number,
    },
    title: {
      type: String,
    },
    userName: {
      type: String,
    },
    like: {
      type: Array
    },
    isUnder: {
      type: Number,
    }
  },
);

function validateComment(comment) {
  const schema = {
    id: Joi.number().required(),
    postLId: Joi.number().required(),
    title: Joi.string().required(),
    userName: Joi.string().required(),
    like: Joi.array().required(),
    isUnder: Joi.number()
  }
  return Joi.validate(comment, schema);
}

exports.validateComment =validateComment;

module.exports = mongoose.model("comment", commentSchema);