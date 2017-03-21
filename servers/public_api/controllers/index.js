let app = require('../app');

app.use('/articles', require('./articles'));
app.use('/auth', require('./auth'));
app.use('/reg',  require('./reg'));

