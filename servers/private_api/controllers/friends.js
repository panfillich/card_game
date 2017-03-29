let express     = require('express');
let router      = express.Router();

let Friends       = require('../../models/friends');
let ResFormat   = require('../../common_libs/res_format');

router.get('/', function(req, res, next) {
    Friends.getAllFriends({'userId':req.session.get('userId')}, function(err, result){
        if(err) {
            return next(err);
        } else {
            let status = 200;
            let final_result = [];
            result.forEach(function (user) {
                final_result.push({
                    'recordId'  : user.recordId,
                    'createdAt' : user.createdAt,
                    'login'     : user.login
                });
            });
            let json = ResFormat(status, 'Friends list', {friends:final_result});
            return res.status(status).send(JSON.stringify(json));
        }
    });
});

module.exports = router;
