let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: String,
    userId: String,
    userFollow: [String],
    userURL: String,
    password: String 
  },
);

module.exports = mongoose.model("user", userSchema);