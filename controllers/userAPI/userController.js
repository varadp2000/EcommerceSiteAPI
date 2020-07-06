const express = require("express");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const User = require("../../schema/user");
const WishList = require("../../schema/wishlist");
const Cart = require("../../schema/cart");
const Book = require("../../schema/books");
const cart = require("../../schema/cart");

class UserController {
  static details = async (req, res) => {
    const token = req.header("x-auth-token");
    try {
      let data = jwt.decode(token, process.env.JWTSecret);

      const user = await User.findById(data.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
  };
  static getWishList = async (req, res) => {
    const userid = req.params.userid;
    try {
      const wishlist = await WishList.findOne({
        user: userid,
      });
      console.log(userid);
      return res.json(wishlist);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
  };
  static addToWishList = async (req, res) => {
    try {
      var wishlist = await WishList.findOne({ user: req.body.userid });
      if (wishlist) wishlist.books.push(req.body.bookid);
      else {
        wishlist = new WishList({
          user: req.body.userid,
          books: [req.body.bookid],
        });

        wishlist.save();

        return res.send({ msg: "Book Added Successfully" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
  };
  static addToCart = async (req, res) => {
    try {
      let { books, userid, deliveryfee } = req.body;
      var amount = [];
      var value = 0;
      for (let book in books) {
        let b = await Book.findOne({ id: book.id });
        amount.push({
          price: b.price,
          book: book.in,
        });
        value += b.price;
      }
      let tax = (parseFloat(value) * 9.18) / 100;
      var total = {
        amount,
        tax,
        deliveryfee,
      };
      var cart = await Cart.findOne({ user: userid });
      if (cart) return res.json({ msg: "Please clear existing cart" });
      else {
        cart = new Cart({
          user: req.body.userid,
          total,
        });

        await cart.save();

        return res.json({ cart, total: value + tax + deliveryfee });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
  };
  static clearCart = async (req, res) => {
    try {
      var cartid = req.params.cartid;
      console.log(cartid);
      await cart.remove({ _id: cartid });

      return res.json({ msg: "Cart Cleared Successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
  };
  static getCart = async (req, res) => {
    try {
      var cart = await Cart.findOne({ user: req.params.userid });
      return res.json(cart);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
  };
}

module.exports = UserController;
