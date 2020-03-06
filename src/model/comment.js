let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let commentSchema = new Schema(
  {
    id: Number,
    postLId: Number,
    title: String,
    userName: String,
    like: [String], 
    isUnder: Number
  },
);

module.exports = mongoose.model("comment", commentSchema);