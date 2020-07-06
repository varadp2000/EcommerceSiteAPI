const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  auther: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  edition: {
    type: String,
    required: true,
  },
  category: [{ type: String }],
});

module.exports = mongoose.model("book", bookSchema);
