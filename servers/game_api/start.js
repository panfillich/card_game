var express = require('express');
var app = express();

server = app.listen(3004, function() {
    console.log('Chat_api listening on port ' + 3004);
});

app.get('/', function (req, res) {
    res.send('Hello World!')
})



