/*const current_folder = __dirname;
const current_file   = __filename;
const fs = require('fs');

fs.readdirSync(current_folder).forEach(file => {
    if((current_folder+'/'+file) == current_file){
        return;
    }
    require('./' + file);
});*/


let app = require('../app');

app.use('/test', require('./test'));
app.use('/auth', require('./auth'));

