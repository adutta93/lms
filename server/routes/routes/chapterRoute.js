const express = require('express');

const router = express.Router();
const { protect, authorize } = require('../../middleware/auth');
// authorize('admin'), protect,
module.exports = (app, db) => {
  const { chapters, video, orderlist, topic, Test } = db;
  app.get('/chapters', (req, res) => {
    chapters.findAll().then(function (e) {
      res.json(e);
    });
  });
  //collectionsRoutes(app);
  app.get('/chaptervideo/:chapterId', protect, (req, res) => {
    console.log(req.params.chapterName);
    video
      .findAll({ where: { chapterChapterId: req.params.chapterId } })
      .then(function (exist) {
        if (!exist) {
          res.json('no such video for this', req.params.chapterName);
        }
        res.send(exist);
      })
      .catch(function (err) {
        console.log('coming from error');
        res.json(err);
      });
  });

  app.get('/chaptervideolist/:chapterId', protect, (req, res) => {
    chapters
      .findOne({ where: { chapterId: req.params.chapterId } })
      .then((exist) => {
        console.log(exist);
        if (!exist) {
          res.json({ message: 'no such topic pls create one ' });
        } else {
          video
            .findAndCountAll({
              where: { chapterChapterId: req.params.chapterId },
            })
            .then((subject) => {
              if (!subject) {
                res.json({ fdff: 'fff' });
              }
              res.send(subject);
            });
        }
      });
  });

  app.post('/chaptervideoupload', authorize('admin'), protect, (req, res) => {
    // console.log(questiond)
    console.log(req.body);
    if (!req.body) {
      return res.send(400);
    }
    chapters
      .findOne({ where: { chapterId: req.body.chapterId } })
      .then((exist) => {
        console.log(exist);
        if (!exist) {
          res.json({ message: 'no such chapter pls create one ' });
        } else {
          video
            .create({
              chapterChapterId: req.body.chapterId,
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
                  cchapterChapterId: req.body.chapterId,
                  videoVideoId: s,
                })
                .then((s) => {
                  if (!s) {
                    res.json({ message: 'error in orderlist' });
                  }
                  res
                    .status(200)
                    .json({ message: 'video updated for chapter' });
                });
            });
        }
      });
  });

  app.get('/chapter/:topicId', protect, (req, res) => {
    console.log(req.params.topicId);
    chapters
      .findAll({ where: { topicId: req.params.topicId } })
      .then(function (exist) {
        if (!exist) {
          res.json('no such subject');
        }
        res.send(exist);
      })
      .catch(function (err) {
        console.log('coming from error');
        res.json(err);
      });
  });

  app.post('/chapterupload', authorize('admin'), protect, (req, res) => {
    topic.findOne({ where: { topicId: req.body.topicId } }).then((exist) => {
      console.log(exist);

      if (!exist) {
        res.json({ message: 'no such subject ' });
      } else {
        chapters
          .findOne({
            where: { chapterName: req.body.chapterName, topicId: exist.Id },
          })
          .then((one) => {
            if (!one) {
              chapters
                .create({
                  topicId: exist.Id,
                  chapterName: req.body.chapterName,
                  chapterDesc: req.body.chapterDesc,
                })
                .then((subject) => {
                  if (!subject) {
                    res.json({ fdff: 'fff' });
                  }
                  res.json(subject);
                });
            } else {
              res.json(
                'This chapter alredy exist in topic named  ' +
                  req.body.topicName
              );
            }
          });
      }
    });
  });

  app.post('/chaptertestupload', authorize('admin'), protect, (req, res) => {
    const chapterName = req.body.chapterName;
    chapters
      .findOne({ where: { chapterId: req.body.chapterId } })
      .then(function (s) {
        if (!s) {
          res.json({ message: 'No such chapter exist in  ' + chapterName });
        } else {
          Test.create({
            chapterChapterId: req.body.chapterId,
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
                  chapterChapterId: req.body.chapterId,
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

  app.get('/chaptertestlist/:chapterId', protect, (req, res) => {
    Test.findAndCountAll({
      where: { chapterChapterId: req.params.chapterId },
    }).then(function (s) {
      if (!s) {
        res.json({ message: 'no such subject exist' });
      } else {
        res.json(s);
      }
    });
  });

  app.put('/updatechapter/:Id', authorize('admin'), protect, function (
    req,
    res
  ) {
    chapter.findOne({ where: { Id: req.params.Id } }).then((s) => {
      if (!s) {
        res.json('no such topic exist');
      }
      if (s) {
        chapter
          .update(
            { message: 'Successfully updated' },
            { where: { Id: req.params.Id } }
          )
          .then((s) => {
            res.status(200);
          });
      }
    });
  });

  app.delete(
    '/deletechapter/:chapterId',
    authorize('admin'),
    protect,
    function (req, res) {
      chapter
        .findOne({ where: { chapterId: req.params.chapterId } })
        .then((s) => {
          if (!s) {
            res.json('no such chapter exist');
          }
          if (s) {
            chapter
              .destroy({ where: { chapterId: req.params.chapterId } })
              .then((s) => {
                res.status(200).json({
                  message: 'Successfully deleted',
                });
              });
          }
        });
    }
  );
};
