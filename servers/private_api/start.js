var express = require('express');
var app = express();

server = app.listen(3002, function() {
    console.log('api_private listening on port ' + 3002);
});

app.get('/', function (req, res) {
    console.log(3002);
    res.send('Hello2 World!')
})



