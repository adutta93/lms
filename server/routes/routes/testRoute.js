const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// const {} = require('../controller/authController');

const Test = require('../../models/Test');

module.exports = (app, db) => {
  const { Test } = db;
  app.get('/test', (req, res) => {
    Test.findAll().then(function (e) {
      res.json(e);
    });
  });
};
