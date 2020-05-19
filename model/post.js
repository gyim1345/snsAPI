let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let postSchema = new Schema(
  {
    id: Number,
    title: String,
    imageUrl: String,
    userName: String,
    like: [String], 
    tag: [String],
    userImageUrl: String
  },
);

module.exports = mongoose.model("post", postSchema);