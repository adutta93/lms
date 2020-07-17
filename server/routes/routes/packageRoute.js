const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// const {} = require('../controller/authController');
const course = require('../../models/course');
const packages = require('../../models/coursepackage');
const subject = require('../../models/subject');
const orderlist = require('../../models/orderlist');
const video = require('../../models/video');

module.exports = (app, db) => {
  const { course, packages, subject, orderlist, video } = db;
  app.post('/createpackage', (req, res) => {
    var courseId = req.body.courseId;
    var subjectId = req.body.subjectId;
    var topicId = req.body.topicId;
    var chapterId = req.body.chapterId;
    if (courseId) {
      course
        .findAll({ where: { courseId: req.body.courseId } })
        .then((exist) => {
          if (!exist) {
          } else {
            packages
              .create({
                courseCourseId: req.body.courseId,
                PackageName: req.body.PackageName,
                PackageDesc: req.body.PackageDesc,
                PackagePrice: req.body.PackagePrice,
              })
              .then((package) => {
                if (!package) {
                  res.json({ message: 'Error in response' });
                } else {
                  res.json(package);
                }
              });
          }
        });
    }
    if (subjectId) {
      subject.findAll({ where: { subjectId: subjectId } }).then((exist) => {
        if (!exist) {
        } else {
          packages
            .create({
              subjectId: subjectId,
              PackageName: req.body.PackageName,
              PackageDesc: req.body.PackageDesc,
              PackagePrice: req.body.PackagePrice,
            })
            .then((package) => {
              if (!package) {
                res.json({ message: 'Error in response' });
              } else {
                res.json(package);
              }
            });
        }
      });
    }

    if (chapterId) {
      chapters.findAll({ where: { chapterId: chapterId } }).then((exist) => {
        if (!exist) {
        } else {
          packages
            .create({
              chapterChapterId: chapterId,
              PackageName: req.body.PackageName,
              PackageDesc: req.body.PackageDesc,
              PackagePrice: req.body.PackagePrice,
            })
            .then((package) => {
              if (!package) {
                res.json({ message: 'Error in response' });
              } else {
                res.json(package);
              }
            });
        }
      });
    }
    if (topicId) {
      topic.findAll({ where: { topicId: topicId } }).then((exist) => {
        if (!exist) {
        } else {
          packages
            .create({
              topicId: topicId,
              PackageName: req.body.PackageName,
              PackageDesc: req.body.PackageDesc,
              PackagePrice: req.body.PackagePrice,
            })
            .then((package) => {
              if (!package) {
                res.json({ message: 'Error in response' });
              } else {
                res.json(package);
              }
            });
        }
      });
    }
  });

  app.get('/getallpackages', (req, res) => {
    const { packages } = db;
    packages.findAll().then((e) => {
      if (!e) {
        res.json('no package found');
      } else {
        res.json(e);
      }
    });
  });

  app.post('/packageorder', (req, res) => {
    var courseId = req.body.courseId;
    var subjectId = req.body.subjectId;
    var topicId = req.body.topicId;
    var chapterId = req.body.chapterId;
    var videoId = req.body.videoId;
    var packagePackageId = req.body.packageId;
    var TestId = req.body.TestId;
    if (!courseId) {
      courseId = '123e4567-e89b-12d3-a456-426614174000';
    }
    if (!subjectId) {
      subjectId = '123e4567-e89b-12d3-a456-426614174000';
    }
    if (!topicId) {
      topicId = '123e4567-e89b-12d3-a456-426614174000';
    }
    if (!chapterId) {
      chapterId = '123e4567-e89b-12d3-a456-426614174000';
    }
    if (!videoId) {
      videoId = '123e4567-e89b-12d3-a456-426614174000';
    }
    if (!packagePackageId) {
      packagePackageId = 'n123e4567-e89b-12d3-a456-426614174000';
    }
    if (!TestId) {
      TestId = '123e4567-e89b-12d3-a456-426614174000';
    }
    //  video.findOne(
    //    {where:{videoId:req.body.videoId}},
    //    ).then(function(v){
    orderlist
      .create({
        packagePackageId: packagePackageId,
        videoVideoId: videoId,
        courseCourseId: courseId,
        topicid: topicId,
        chapterChapterId: chapterId,
        subjectId: subjectId,
        TestTestId: TestId,
        orderNumber: req.body.orderNumber,
      })
      .then(function (s) {
        if (!s) {
          res.json({ mesage: 'problem while updating orderlist' });
        } else {
          res.json({ message: ' orderlist updated ' });
        }
      });
  });

  app.get('/packageorder/:courseId', (req, res) => {
    orderlist
      .findAll({ where: { courseCourseId: req.params.courseId } })
      .then((s) => {
        res.send(s);
      });
  });

  app.get('/packageorder/:subjectId', (req, res) => {
    orderlist
      .findAll({ where: { subjectId: req.params.subjectId } })
      .then((s) => {
        res.send(s);
      });
  });

  app.get('/packageorder/:topicId', (req, res) => {
    orderlist.findAll({ where: { topicId: req.params.topicId } }).then((s) => {
      res.send(s);
    });
  });

  app.get('/packageorder/:chapterId', (req, res) => {
    orderlist
      .findAll({ where: { chapterChapterId: req.params.chapterId } })
      .then((s) => {
        res.send(s);
      });
  });

  app.get('/pacakge/:packageId', (req, res) => {
    packages
      .findAll({
        where: { packageId: req.params.packageId },
        include: [
          {
            model: orderlist,
            as: 'list',
          },
        ],
      })
      .then((course) => {
        res.send(course);
      });
  });

  app.post('/addcoursetopackage', (req, res) => {
    var s;
    video
      .findAndCountAll({ where: { courseCourseId: req.body.courseId } })
      .then(function (s) {
        s = s.length;
        console.log(s.length);
        console.log('s', s);
      })
      .then((s) => {
        for (let i = 0; i < s; i++) {}
      });
  });
};
