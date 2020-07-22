const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../../middleware/auth');

module.exports = (app, db) => {
  const { subject, course, topic, chapters } = db;
  app.get('/testo', protect, (req, res) => {
    course
      .findAll({
        include: [
          {
            model: subject,
            as: 'Subjects',
            include: [
              {
                model: topic,
                as: 'Topics',
                include: [
                  {
                    model: chapters,
                    as: 'chapters',
                  },
                ],
              },
            ],
          },
        ],
      })
      .then((course) => {
        console.log(course);
        const resObj = course.map((course) => {
          //tidy up the user data
          return Object.assign(
            {},
            {
              course_Id: course.courseId,
              courseName: course.courseName,
              courseDesc: course.courseDesc,
              subjectName: course.subjectName.map((subject) => {
                //tidy up the post data
                return Object.assign(
                  {},
                  {
                    courseName: subject.courseName,
                    subjectName: subject.subjectName,
                    topicName: subject.topicName.map((topic) => {
                      //tidy up the comment data
                      return Object.assign(
                        {},
                        {
                          subjectName: topic.subjectName,
                          topicName: topic.topicName,
                          //  chapter: topic.chapter.map(chapter => {
                          //    return Object.assign(
                          //      {}, {
                          //      chapterId: chapter.chapterId,
                          //      chapterName: chapter.chapterName,
                          //      topicId: chapter.topicId
                          //    }
                          //    )
                          //  })
                        }
                      );
                    }),
                  }
                );
              }),
            }
          );
        });
        res.json(resObj);
      });
  });
};
