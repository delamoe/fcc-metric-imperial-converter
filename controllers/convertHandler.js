/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

  this.getNum = function (input) {
    var regex =
      (/[-]?[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/g);
    if (input.match(/\d/)) {
      // this works for all tests except no digits
      var result = eval(input.match(regex)[0]);
    } else result = null
    console.log(`result = ${result}`);
    return result;
  }

  this.getUnit = function (input) {
    var result = input.substring(input.search(/\D/), 0);
    console.log(result);
    return result;
  }
  this.getReturnUnit = function (initUnit) {
    var result;

    return result;
  };

  this.spellOutUnit = function (unit) {
    var result;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    var result;

    return result;
  };

}

module.exports = ConvertHandler;
