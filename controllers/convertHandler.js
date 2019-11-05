/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  this.sanitizeString = function (str) {
    var regex = (/lbs|gal|mi|km|kg|l|[0-9\-\+\*\/\.]/gi);
    str = str.match(regex).join('');
    console.log(`sanitized str: `, str);
    return str.trim();
  }

  this.getNum = function (input) {
    var sanitizedStr = this.sanitizeString(input);
    var regex =
      (/(?:[-\+]{0,1}\d*[-\+.\/*]*\d+)*/);
    //check for a digit
    var result = sanitizedStr.match(/\d/)
      // if found, remove all non-math-related
      // chars apply the dreaded eval: Mwahahahaahhaha
      ? eval(sanitizedStr.match(regex)[0])
      // if no digits
      : 'Invalid Numerical Input';
    console.log(`result = ${result}`);
    return result;
  }

  this.getUnit = function (input) {
    var sanitizedStr = this.sanitizeString(input);
    var regex = (/lbs|gal|mi|km|kg|l/i);
    // returns the first usable match
    var result = sanitizedStr.match(regex) === null
      ? "Invalid Character Input"
      : sanitizedStr.match(regex)[0].toLowerCase();
    console.log(`result = ${result}`);
    return result;
  }
  this.getReturnUnit = function (initUnit) {
    var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    var output = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];

    var result = output[input.indexOf(initUnit)] || "Invalid Character Input";

    return result;
  };

  this.spellOutUnit = function (unit) {
    var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    var output = ['gallon', 'liter', 'mile', 'kilometer', 'pound', 'kilogram'];

    var result = output[input.indexOf(unit)] || "Invalid Character Input";
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    var result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;     
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;  
      default:
        result = "Invalid Numerical Input";
        break;
    }
    console.log(`result = ${result}`);

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    // "string":"85 kilograms converts to 187.39308 pounds"
    var result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };

}

module.exports = ConvertHandler;
