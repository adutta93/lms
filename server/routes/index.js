const authRoutes = require('./routes/authRoute');
const chapterRoutes = require('./routes/chapterRoute');
const courseRoutes = require('./routes/courseRoute');
const notesRoutes = require('./routes/notesRoute');
const packageRoutes = require('./routes/packageRoute');
const questionRoutes = require('./routes/questionRoute');
const subjectRoutes = require('./routes/subjectRoute');
const testoRoutes = require('./routes/testoRoute');
const testRoutes = require('./routes/testRoute');
const topicRoutes = require('./routes/topicRoute');

// Add access to the app and db objects to each route

function authrouter(app, db) {
  return authRoutes(app, db);
}
function courserouter(app, db) {
  return courseRoutes(app, db);
}

function notesrouter(app, db) {
  return notesRoutes(app, db);
}

function packagerouter(app, db) {
  return packageRoutes(app, db);
}

function subjectrouter(app, db) {
  return subjectRoutes(app, db);
}
function questionrouter(app, db) {
  return questionRoutes(app, db);
}

function testorouter(app, db) {
  return testoRoutes(app, db);
}

function testrouter(app, db) {
  return testRoutes(app, db);
}

function topicrouter(app, db) {
  return topicRoutes(app, db);
}
function chapterrouter(app, db) {
  return chapterRoutes(app, db);
}

module.exports = {
  chapterrouter,
  topicrouter,
  packagerouter,
  testorouter,
  testrouter,
  questionrouter,
  notesrouter,
  courserouter,
  authrouter,
  subjectrouter,
};
