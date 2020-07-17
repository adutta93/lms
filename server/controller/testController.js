const Test = require('../models/Test');

exports.test = (req, res) => {
  Test.findAll().then(function (e) {
    res.json(e);
  });
};
