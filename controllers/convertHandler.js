/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  this.sanitizeString = function (str) {
    var regex = (/[0-9\-\+\*\/\.]+(?:lbs|gal|mi|km|kg|l)$/gi);
    // will return null on bad input 
    // var regex = (/(?:lbs|gal|mi|km|kg|l)\b|[0-9\-\+\*\/\.]/gi);
    console.log(`sanitizeString: ${str.match(regex)}`);
    if (str.match(regex) === null) {
      return 'No Valid Input';
    } else {
      return str.match(regex).join('').trim();
    }
  }

  this.getNum = function (input) {
    var sanitizedStr = this.sanitizeString(input);
    console.log(`getNum sanStr: `, sanitizedStr);
    var regex =
      (/(?:[-\+]{0,1}\d*[-\+.\/*]*\d+)*/);
    //check for a digit
    var result = sanitizedStr.match(/\d/)
      // if found, remove all non-math-related
      // chars apply the dreaded eval: Mwahahahaahhaha
      ? eval(sanitizedStr.match(regex)[0])
      // if no digits
      : 'Invalid Quantity';
    console.log(`getNum = ${result}`);
    return result;
  }

  this.getUnit = function (input) {
    var sanitizedStr = this.sanitizeString(input);
        console.log(`getUnit sanStr: `, sanitizedStr);
    var regex = (/(?:lbs|gal|mi|km|kg|l)\b/i);
    // returns the first usable match
    console.log(`getUnit match = ${sanitizedStr.match(regex)}`);
    var result = sanitizedStr.match(regex) === null
      ? "Invalid Unit Type"
      : sanitizedStr.match(regex)[0].toLowerCase();
    console.log(`getUnit = ${result}`);
    return result;
  }
  this.getReturnUnit = function (initUnit) {
    var input = ['gal', 'l', 'mi', 'km', 'lb', 'kg'];
    var output = ['l', 'gal', 'km', 'mi', 'kg', 'lb'];

    var result = output[input.indexOf(initUnit)] || "Invalid Unit Type";

    return result;
  };

  this.spellOutUnit = function (unit) {
    var input = ['gal', 'l', 'mi', 'km', 'lb', 'kg'];
    var output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];

    var result = output[input.indexOf(unit)] || "Invalid Unit Type";
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbToKg = 0.453592;
    const miToKm = 1.60934;

    if (typeof initNum != 'number') return 'Invalid Quantity';
    
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
      case 'lb':
        result = initNum * lbToKg;
        break;
      case 'kg':
        result = initNum / lbToKg;
        break;
      default:
        result = 'Invalid Quantity';
        break;
    }
    console.log(`typeof result: ${typeof result}`);
    console.log(`convert = ${result === 'Invalid Quantity'
    ? result
    : +result.toFixed(5)}`);

    return result === 'Invalid Quantity'
    ? result
    : +result.toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    // "string":"85 kilograms converts to 187.39308 pounds"
    var result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };

}

module.exports = ConvertHandler;
