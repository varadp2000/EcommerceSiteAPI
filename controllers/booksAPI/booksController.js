const express = require("express");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const Book = require("../../schema/books");
//const User = require("../../schema/user");

class BookController {
  static addBook = async (req, res) => {
    const token = req.header("x-auth-token");
    const { name, auther, price, category, edition } = req.body;
    try {
      let data = jwt.decode(token, process.env.JWTSecret);
      var book = new Book({
        user: data.user.id,
        name,
        auther,
        price,
        edition,
        category,
      });
      await book.save();

      return res.json(book.id);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
  };

  static getBookByUser = async (req, res) => {
    try {
      const books = await Book.find({ user: req.params.userid });
      return res.send({ books });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
  };
  static getBookByID = async (req, res) => {
    try {
      const books = await Book.findById(req.params.id);
      return res.send({ books });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
  };
  static getAllBooks = async (req, res) => {
    try {
      var books = await Book.find();
      return res.send({ books });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
  };
  static getBookByName = async (req, res) => {
    try {
      var books = await Book.find({ name: req.params.name });
      return res.send({ books });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
  };
  static getBookByAuther = async (req, res) => {
    try {
      var books = await Book.find({ auther: req.params.auther });
      return res.send({ books });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
  };
}

module.exports = BookController;
