/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(input, initNum, initUnit, returnNum, returnUnit);
      var data = {
        "test": {
          "initNum": initNum,
          "initUnit": initUnit,
          "returnNum": returnNum,
          "returnUnit": returnUnit
        },
        "message": toString.message,
        "string": toString.string
      };
      console.log(JSON.stringify(data.message));

        res.json(data);
    });
};
