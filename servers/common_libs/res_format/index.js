const getDesctiption = require('./description');

module.exports = function(status, message='No description', detail=null) {
    let description = getDesctiption(status);

    let json = {
        status: status,
        description: description,
        message: message
    };

    if(detail){
        json.detail = detail;
    }

    return json;
}