const express = require("express");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const User = require("../../schema/user");

class UserController {
  static register = async (req, res) => {
    const {
      name,
      email,
      password,
      address_line1,
      address_line2,
      city,
      state,
      district,
      pin,
    } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      let address = {
        line1: address_line1,
        line2: address_line2,
        city,
        district,
        state,
        pin,
      };
      user = new User({
        name,
        email,
        password,
        address,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWTSecret,
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
  };
}

module.exports = UserController;
