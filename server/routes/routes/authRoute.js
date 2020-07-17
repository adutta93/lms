// const express = require('express');
// const router = express.Router();
// const { check, validationResult } = require('express-validator');
// const User = require('../../models/users');
// // const { errorHandler } = require("../helper/dbErrorHandler");
// const jwt = require('jsonwebtoken'); // to generate signed token
// const expressJwt = require('express-jwt');
// const bcrypt = require('bcryptjs');

// router.post(
//   '/signup',
//   [
//     check('firstName')
//       .isLength({ min: 3 })
//       .withMessage('Firstname must be at least 3 chars long'),

//     check('lastName')
//       .isLength({ min: 2 })
//       .withMessage('Lasttname must be at least 2 chars long'),

//     check('email').isEmail().withMessage('Must be a valid email id'),

//     check('mobileNumber')
//       .isLength({ min: 10 })
//       .withMessage('Enter a valid mobile number'),

//     check('password')
//       .isLength({ min: 8 })
//       .withMessage('Must be a atleast 8 character long')
//       .matches(/\d/)
//       .withMessage('must contain a number'),
//   ],
//   signup
// );

// router.post(
//   '/signin',
//   [
//     check('email').isEmail().withMessage('Must be a valid email id'),

//     check('password')
//       .isLength({ min: 8 })
//       .withMessage('Must be a atleast 8 character long')
//       .matches(/\d/)
//       .withMessage('must contain a number'),
//   ],
//   signin
// );

// router.get('/signout', signout);

// module.exports = (app, db) => {
//   app.get('/hello', function (req, res) {
//     console.log('coming from hello ');

//     res.send('Hello and Welcome to LMS!');
//     // const hashedPassword = await bcrypt.hash("req.body.password", 10);
//     // res.send(hashedPassword);
//   }),
//     app.post('/signup', async function (req, res) {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);
//       console.log(hashedPassword);
//       console.log(req.body);
//       users
//         .create({
//           username: req.body.username,
//           password: hashedPassword,
//           email_Id: req.body.emailId,
//         })
//         .catch(function (errors) {
//           console.log(errors.errors[0].path);
//           const error = errors.errors[0].message;

//           res.status(400).json(error);
//         })
//         .then(function (body, err) {
//           if (err) {
//             res.json({ message: 'problem in users create' });
//           }
//           res.json(body);
//           // save completed!
//           console.log('Save completed ');
//           // updateCounter(job);
//         })
//         .error(function (err) {
//           // something bad :(
//           console.log('Save failed ');
//           // updateCounter(job);
//         })
//         .then(console.log('___________'));
//     });
//   app.post('/signin', async function (req, res) {
//     // find the user based on username
//     console.log(req.body);
//     const user = req.body.username;
//     const password = req.body.password;
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     console.log(hashedPassword);
//     users.findOne({ where: { username: user } }).then(function (nameuser) {
//       console.log(nameuser);
//       const newuser = nameuser;
//       if (!nameuser) {
//         return res.status(400).json({
//           error: 'User with that email does not exist. Please signup',
//         });
//       }
//       if (nameuser) {
//         // there is still no response on th frontend
//         var match = bcrypt.compareSync(password, nameuser.password);

//         if (match) {
//           const token = jwt.sign({ user }, process.env.JWT_SECRET);
//           // persist the token as 't' in cookie with expiry date
//           res.cookie('t', token, { expire: new Date() + 9999 });
//           // return response with user and token to frontend client

//           res.json({ token, nameuser });
//         } else {
//           return res.status(401).json({
//             error: 'Email and password dont match',
//           });
//         }
//       }
//     });
//   });

//   app.post('/signout', (req, res) => {
//     res.clearCookie('t');
//     res.json({ message: 'Signout success' });

//     bcrypt.compare('B4c0//', hash, function (err, res) {
//       // res === true
//     });
//     const user = new User({
//       name: req.body.name,
//       password: hashedPassword,
//       emailId: req.body.emailId,
//     });
//     user.save((err, user) => {
//       res.send('success!');
//       if (err) {
//         return res.status(400).json({
//           error: errorHandler(err),
//         });
//       }
//       res.json({
//         user,
//       });
//     });
//   });
// };

// // PROTECTED ROUTES
// // isSignedIn

// exports.isSignedIn = expressJwt({
//   secret: process.env.JWT_SECRET,
//   userProperty: 'auth',
// });

// // custom middlewares
// // isAuthenticated
// exports.isAuthenticated = (req, res, next) => {
//   let authChecker = req.profile && req.auth && req.profile._id == req.auth._id;
//   if (!authChecker) {
//     return res.status(403).json({
//       error: 'ACCESS DENIED',
//     });
//   }
//   next();
// };
// // isAdmin
// exports.isAdmin = (req, res, next) => {
//   if (req.profile.role === 0) {
//     return res.status(403).json({
//       error: "You're not admin, access denied",
//     });
//   }
//   next();
// };
// module.exports = router;
