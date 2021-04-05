var stringControls = {};
stringControls.capitalizeObjects = function (stringObjects) { // takes an object or an array of objects then capitalizes string attributes
    var result;
    if (Array.isArray(stringObjects)) {
        result = stringObjects.map(value => {
            for (const key in value) {
                if (typeof (value[key]) == "string")
                    value[key] = value[key][0].toUpperCase() + value[key].substring(1);
            }
            return value;
        });
    }
    else {

        result = stringObjects;
        for (const key in result) {
            if (typeof (result[key]) == "string")
                result[key] = result[key][0].toUpperCase() + result[key].substring(1);
        }

    }
    return result;
}

stringControls.normalizeObject = function (stringObject) {  // tolower data in order to store in the db
    for (const key in stringObject) {
        if (typeof (stringObject[key]) == "string")
            stringObject[key] = stringObject[key].toLowerCase();
    }
    return stringObject;
}

stringControls.deleteBlankSpaces = function (value) {
    for (const key in value) {
        if (value[key] == '')
            delete value[key];
    }
    return value;
}

//console.log(stringControls.({name:"luiASDs",lastname:"ASDhuaman"}));
//const test = [{ name: "luis", lastname: "jerga" }, { name: "lucas", lastname: "huara" }];
//const test = {name:"luis"};
module.exports = stringControls;