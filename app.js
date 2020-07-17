const express = require('express');
const app = express();
var db = require('./server/config/db');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
var router = express.Router();
router = require('./server/routes/index');
const cors = require('cors');
require('dotenv').config();

//midlewares
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors());
console.log(router);

// DB Connection
router.topicrouter(app, db);
router.chapterrouter(app, db);
router.packagerouter(app, db);
router.testorouter(app, db);
router.testrouter(app, db);
router.questionrouter(app, db);
router.notesrouter(app, db);
router.courserouter(app, db);
router.subjectrouter(app, db);
// router.authrouter(app, db);

// server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
