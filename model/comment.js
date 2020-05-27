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


module.exports = mongoose.model("comment", commentSchema);