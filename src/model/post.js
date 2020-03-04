let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let postSchema = new Schema(
  {
    id: Number,
    title: String,
    imageUrl: String,
    userName: String,
    like: [String], 
    tag: [String]
  },
//   { versionKey: "_somethingElse" }
);

module.exports = mongoose.model("post", postSchema);