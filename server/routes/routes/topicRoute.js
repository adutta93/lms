const express = require('express');

const { check, validationResult } = require('express-validator');

module.exports = (app, db) => {
  const { topic, video, subject, orderlist, Test } = db;
  app.get('/topic', (req, res) => {
    console.log('From topic route');
    topic.findAll().then(function (e) {
      res.json(e);
    });
  });

  app.get('/topicvideo/:topicId', (req, res) => {
    console.log(req.params.topicName);
    video
      .findAll({ where: { topicId: req.params.topicId } })
      .then(function (exist) {
        if (!exist) {
          res.json('no such video for this', req.params.topicName);
        }
        res.send(exist);
      })
      .catch(function (err) {
        console.log('coming from error');
        res.json(err);
      });
  });

  app.get('/topicvideolist/:topicId', (req, res) => {
    topic.findOne({ where: { topicId: req.params.topicId } }).then((exist) => {
      console.log(exist);
      if (!exist) {
        res.json({ message: 'no such topic pls create one ' });
      } else {
        video
          .findAndCountAll({ where: { topicId: req.params.topicId } })
          .then((subject) => {
            if (!subject) {
              res.json({ fdff: 'fff' });
            }
            res.send(subject);
          });
      }
    });
  });

  app.post('/topicupload', (req, res) => {
    subject
      .findOne({
        where: { subjectId: req.body.subjectId },
        // attributes: ['Id']
      })
      .then((exist) => {
        console.log(exist);
        if (!exist) {
          res.json({ message: 'no such subject ' });
        } else {
          topic
            .findOne({
              where: { topicName: req.body.topicName, subjectId: exist.Id },
            })
            .then((one) => {
              if (!one) {
                topic
                  .create({
                    topicName: req.body.topicName,
                    subjectId: exist.Id,
                    topicDesc: req.body.topicDesc,
                  })
                  .then((subject) => {
                    if (!subject) {
                      res.json({ fdff: 'fff' });
                    }
                    res.json(subject);
                  });
              } else {
                res.json('This topic alredy exsit in  ' + req.body.topicId);
              }
            });
        }
      });
  });

  app.get('/topic/:subjectId', (req, res) => {
    console.log(req.params.subjectName);
    topic
      .findAll({ where: { subjectId: req.params.subjectId } })
      .then(function (exist) {
        if (!exist) {
          res.json('no such topic');
        }
        res.send(exist);
      })
      .catch(function (err) {
        console.log('coming from error');
        res.json(err);
      });
  });

  app.post('/topicvideoupload', (req, res) => {
    console.log(req.body);
    if (!req.body) {
      return res.send(400);
    }
    topic.findOne({ where: { topicId: req.body.topicId } }).then((exist) => {
      console.log(exist);
      if (!exist) {
        res.json({ message: 'no such topic pls create one ' });
      } else {
        video
          .create({
            topicId: req.body.topicId,
            videoPath: req.body.videoPath,
          })
          .then((subject) => {
            if (!subject) {
              res.json({ fdff: 'fff' });
            }
            let s = subject.videoId;
            console.log('s', s);
            orderlist
              .create({
                topicId: req.body.topicId,
                videoVideoId: s,
              })
              .then((s) => {
                if (!s) {
                  res.json({ message: 'error in orderlist' });
                }
                res.json({ su: 'done' });
              });
          });
      }
    });
  });

  app.post('/topictestupload', (req, res) => {
    const topicName = req.body.topicName;
    topic.findOne({ where: { topicId: req.body.topicId } }).then(function (s) {
      if (!s) {
        res.json({ message: 'No such topic exist in  ' + topicName });
      } else {
        Test.create({
          topicId: req.body.topicId,
          TestTitle: req.body.TestTittle,
          Testlink: req.body.url,
          exam_type: req.body.type,
        }).then(function (s) {
          if (!s) {
            res.json({ message: 'field problem' });
          } else {
            let sh = s.Test_Id;
            orderlist
              .create({
                topicId: req.body.topicId,
                TestTestId: sh,
              })
              .then((s) => {
                if (!s) {
                  res.json('error while orderlist update');
                }
                res.json('Test created');
              });
          }
        });
      }
    });
  });

  app.get('/topictestlist/:topicId', (req, res) => {
    Test.findAndCountAll({ where: { topicId: req.params.topicId } }).then(
      function (s) {
        if (!s) {
          res.json({ message: 'no such topic exist' });
        } else {
          res.json(s);
        }
      }
    );
  });
};
