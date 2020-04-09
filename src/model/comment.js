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
    replyToCommentId: {
      type: Number,
    }
  },
);

// function validateComment(comment) {
//   const schema = {
//     id: Joi.number(),
//     postLId: Joi.number(),
//     title: Joi.string(),
//     userName: Joi.string(),
//     like: Joi.array(),
//     isUnder: Joi.number()
//   }
//   console.log('asdasd')
//   return Joi.validate(comment, schema);
// }

// exports.validateComment = validateComment;

module.exports = mongoose.model("comment", commentSchema);