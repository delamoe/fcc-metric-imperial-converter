/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  // this.sanitizeString = function (str) {
  //   // var regex = (/[0-9\-\+\*\/\.]+(?:lbs|gal|mi|km|kg|l)$/gi);
  //   // will return null on bad input 
  //   var regex = (/(?:lbs|gal|mi|km|kg|l)\b|[0-9\-\+\*\/\.]/gi);
  //   console.log(`sanitizeString: ${str.match(regex)}`);
  //   if (str.match(regex) === null) {
  //     return 'No Valid Input';
  //   } else {
  //     return str.match(regex).join('').trim();
  //   }
  // }

  this.getNum = function (input) {
    /* var fullRegex =
        (/[0-9\-\+\*\/\.]+(?:lbs|gal|mi|km|kg|l)$/gi);*/
    // this function should return either
    // a valid number input, 1 or the string 'invalid number'
    // start by sanitizing the user input and
    // checking for valid 'mathy' chars with regex
    // WooHoo!!
    var anyMathyChars = (/(?:[\d\-\+])(?:[\-\+\.\/\*\%]{0,1}\d+)*/);
    // this will filter out leading, trailing and double operators
    var maths = input.match(anyMathyChars);
    // null check
    // if no digits or 'mathy' chars, default is 1
    if (maths === null) return 1;
    if (input.match(/[\-\+\.\/\*\%]{2,}/)) return 'invalid number';
    // check for at least one digit
    console.log(`maths: ${maths}, maths[0].match(/\d/), maths[0].match(/[\-\+\/\*\.\%]/): ${maths === null ? null : maths[0].match(/\d/), maths[0].match(/[\-\+\/\*\.\%]/)}`);
    var result = maths[0].match(/\d/)
      // if found, assign to result and apply
      // the dreaded eval: Mwahahahaahhaha
      ? eval(maths[0])
      // check for other 'mathy' chars
      : maths[0].match(/[\-\+\/\*\.\%]/) !== null
        // if found...
        ? 'invalid number'
        // if no digits or 'mathy' chars, default is 1
        : 1;
    console.log(`getNum = ${result}`);
    return result;
  }

  this.getUnit = function (input) {
    var fullRegex = (/[0-9\-\+\*\/\.]+(?:lbs|gal|mi|km|kg|l)$/gi);
    var regex = (/(?:lbs|gal|mi|km|kg|l)\b/i);
    var sanitizedStr = input.match(regex);
    // console.log(`getUnit sanStr: `, sanitizedStr);
    if (sanitizedStr === null) return 'invalid unit';
    // returns the first usable match
    // console.log(`getUnit match = ${sanitizedStr[0].match(regex)}`);
    var result = sanitizedStr[0].match(regex) === null
      ? "invalid unit"
      : sanitizedStr[0].match(regex)[0].toLowerCase();
    // console.log(`getUnit = ${result}`);
    return result;
  }

  this.getReturnUnit = function (initUnit) {
    var input = ['gal', 'l', 'mi', 'km', 'lb', 'kg'];
    var output = ['l', 'gal', 'km', 'mi', 'kg', 'lb'];

    var result = output[input.indexOf(initUnit)] || "invalid unit";

    return result;
  };

  this.spellOutUnit = function (unit) {
    var input = ['gal', 'l', 'mi', 'km', 'lb', 'kg'];
    var output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];

    var result = output[input.indexOf(unit)] || "invalid unit";
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbToKg = 0.453592;
    const miToKm = 1.60934;

    // if (initNum === 'invalid number' && initUnit === 'invalid unit') return 'invalid number and invalid unit';
    if (initNum === 'invalid number') return 'invalid number';
    if (initUnit === 'invalid unit') return 'invalid number';

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
        result = 'unknown input error';
        break;
    }
    // console.log(`typeof result: ${typeof result}`);

    // console.log(`convert = ${result === 'unknown input error'
    //   ? result
    //   : +result.toFixed(5)}`);

    return result === 'unknown input error'
      ? result
      : +result.toFixed(5);
  };

  this.getString = function (input, initNum, initUnit, returnNum, returnUnit) {
    // "string":"85 kilograms converts to 187.39308 pounds"
    // "Error - ${input}"
    var result = {};
    if (initNum === "invalid number" || initUnit === "invalid unit") result.string = `error - ${input}`;
    else result.string = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    if (initNum === "invalid number" && initUnit === "invalid unit") result.message = { "error": "invalid number and unit"};

    else if (initNum === "invalid number") result.message = { "error": "invalid number"};

    else if (initUnit === "invalid unit") result.message = { "error": "invalid unit"};

    else result.message = {
      "initNum": initNum,
      "initUnit": initUnit,
      "returnNum": returnNum,
      "returnUnit": returnUnit,
      "string": `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    }

    return result;
  };

}

module.exports = ConvertHandler;
