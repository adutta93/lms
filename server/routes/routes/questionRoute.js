const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// const {} = require('../controller/authController');

const questions = require('../../models/questions');
const chapters = require('../../models/chapters');
// const db = require('../config/db');

module.exports = (app, db) => {
  const { questions, chapters } = db;
  app.post('/questionupload', (req, res) => {
    // console.log(questiond)
    console.log(req.body);
    if (!req.body) {
      return res.send(400);
    }
    chapters
      .findOne({ where: { chapterName: req.body.chapterName } })
      .then((exist) => {
        console.log(exist);
        if (!exist) {
          res.json({ message: 'no such chapter pls create one ' });
        } else {
          questions
            .create({
              chapterName: req.body.chapterName,
              questionDesc: req.body.questionDesc,
            })
            .then((subject) => {
              if (!subject) {
                res.json({ fdff: 'fff' });
              }
              res.status(200).json({ message: 'question updated' });
            });
        }
      });
  });

  app.get('/question/:chapterName', (req, res) => {
    console.log(req.params.chapterName);
    questions
      .findAll({ where: { chapterName: req.params.chapterName } })
      .then(function (exist) {
        if (!exist) {
          res.json('no such video for this course');
        }
        res.send(exist);
      })
      .catch(function (err) {
        console.log('coming from error');
        res.json(err);
      });
  });

  app.get('/question', (req, res) => {
    db.query('select * from questions').then((question) => {
      res.json(question);
    });
    //  db.question.findAll().then((result) => res.json(result))
  });
};
