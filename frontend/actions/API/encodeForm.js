// Json to special string for application/x-www-form-urlencoded format of body

function jsonToString(json) {
    var formBody = [];
    for (var property in json) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(json[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
}

export default jsonToString;