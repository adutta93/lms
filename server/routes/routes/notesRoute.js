const notes = require('../../models/notes');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// const {} = require('../controller/authController');

module.exports = (app, db) => {
  const { notes } = db;
  app.post('/notesupload', (req, res) => {
    var courseId = req.body.courseId;
    var subjectId = req.body.subjectId;
    var topicId = req.body.topicId;
    var chapterId = req.body.chapterId;

    if (!courseId) {
      courseId = 'NA';
    }
    if (!subjectId) {
      subjectId = 'NA';
    }
    if (!topicId) {
      topicId = 'NA';
    }
    if (!chapterId) {
      chapterId = 'NA';
    }

    // console.log(questiond)
    console.log(req.body);
    if (!req.body) {
      return res.send(400);
    }
    notes
      .create({
        courseCourseId: courseId,
        topicid: topicId,
        chapterChapterId: chapterId,
        subjectId: subjectId,
        vnotesPath: req.body.vnotesPath,
      })
      .then((subject) => {
        if (!subject) {
          res.json({ fdff: 'fff' });
        }
        res.status(200).json({ message: 'question updated' });
      });
  });

  app.get('/notes/:courseId', (req, res) => {
    notes
      .findAll({ where: { courseCourseId: req.params.courseId } })
      .then((s) => {
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

  app.get('/notes/:subjectId', (req, res) => {
    notes
      .findAll({ where: { subjectId: req.params.subjectId } })
      .then((s) => {
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

  app.get('/notes/:topicId', (req, res) => {
    notes
      .findAll({ where: { topicId: req.params.topicId } })
      .then((s) => {
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

  app.get('/notes/:chapterId', (req, res) => {
    notes
      .findAll({ where: { chapterChapterId: req.params.chapterChapterId } })
      .then((s) => {
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
};
