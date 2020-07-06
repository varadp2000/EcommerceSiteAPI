const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentID: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("payment", userSchema);
