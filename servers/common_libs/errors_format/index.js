module.exports = function(res, status, message, detail=null) {
    let description = '';
    switch (status) {
        case 400:
            description = 'Bad Request';
            break;
        case 401:
            description = 'Unauthorized';
            break;
        case 403:
            description = 'Forbidden';
            break;
        case 404:
            description = 'Not Found';
            break;
        case 500:
            description = 'Internal Server Error';
            break;
        default:
            description = 'No description';
    }

    let json = {
        status: status,
        description: description,
        message: message
    };

    if(detail){
        json.detail = detail;
    }

    res.status(status).send(JSON.stringify(json));
}