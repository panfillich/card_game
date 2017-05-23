let app = require('../app');

app.use('/user', require('./user'));
app.use('/friends', require('./friends'));
app.use('/collection', require('./collection'));
app.use('/decks', require('./decks'));


