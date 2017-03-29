let app = require('../app');

app.use('/user', require('./user'));
app.use('/friends', require('./friends'));



