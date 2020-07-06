const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
});

module.exports = mongoose.model("WishList", wishlistSchema);
