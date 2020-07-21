const express = require('express');
// const User = require('../models/userModels');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// routes
module.exports = (app, db) => {
  const { users } = db;
  // register/signup
  app.post(
    '/register',
    asyncHandler(async (req, res, next) => {
      const {
        firstName,
        lastName,
        email_Id,
        mobileNumber,
        password,
        role,
      } = req.body;

      // hashing password with bcrypt
      // users.pre('save', async function (next) {
      //   const salt = await bcrypt.genSalt(10);
      //   this.password = await bcrypt.hash(this.password, salt);
      // });

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('This is the password', hashedPassword);
      //create user
      const user = await users.create({
        firstName,
        lastName,
        email_Id,
        mobileNumber,
        password: hashedPassword,
        role,
      });

      //create token
      sendTokenResponse(user, 200, res);

      next();
    })
  );

  // login/signin

  app.post('/login', async function (req, res, next) {
    const { email_Id, password } = req.body;

    //validation email and password
    if (!email_Id || !password) {
      return next(new ErrorResponse('Please enter email id and password', 400));
    }
    //check for user

    users.findOne({ email_Id }).then((user) => {
      if (!user) {
        return next(new ErrorResponse('Invalid credential', 401));
      }
      const isMatch = async () => {
        //check if password matchs
        let hashedPassword = await bcrypt.hash(password, 10);
        const isMatch = bcrypt.compareSync(hashedPassword, user.password);
        return isMatch;
      };

      if (!isMatch) {
        return next(new ErrorResponse('Invalid password', 401));
      }
      //create token
      sendTokenResponse(user, 200, res);
    });
  });

  // to see the logged user
  app.get(
    '/getLoggedInUser',
    asyncHandler(async (req, res, next) => {
      // user is already available in req due to the protect middleware
      const user = req.user;

      res.status(200).json({
        success: true,
        data: user,
      });
    })
  );

  //get token from model, create a cookie, send res
  const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    console.log(token);
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 });

    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }

    res
      .status(statusCode)
      .cookie('token', token, { expire: new Date() + 9999 })
      .json({
        message: 'Succesful',
        token,
      });
  };
};
