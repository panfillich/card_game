const current_folder = __dirname;
const current_file   = __filename;
const fs = require('fs');

fs.readdirSync(current_folder).forEach(file => {
    if((current_folder+'/'+file) == current_file || (file.slice(-3) != '.js')){
        return;
    }
    require('./' + file);
});