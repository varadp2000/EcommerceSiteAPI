const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  total: {
    amount: [
      {
        price: { type: Number },
        book: { type: mongoose.Schema.Types.ObjectId, ref: "book" },
      },
    ],
    tax: {
      type: Number,
      required: true,
    },
    deliveryfee: {
      type: Number,
      required: true,
    },
  },
});

module.exports = mongoose.model("Cart", cartSchema);
