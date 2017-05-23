let express     = require('express');
let router      = express.Router();

let Collections = require('../../models/collections');
let ResFormat   = require('../../common_libs/res_format');

// Получить всю коллекцию
router.get('/', function(req, res, next) {
    Collections.getCollection({userId: req.session.get('userId')}, function (err, result) {
        if (err) return next(err);
        let status = 200;
        let json = ResFormat(status, 'User collection', {collection: result});
        return res.status(status).send(JSON.stringify(json));
    });
});

// Удалить карту из коллекции
router.delete('/card/:card_id([0-9]{1,4})', function (req, res, next) {
    const USER_ID = req.session.get('userId');
    const CARD_ID = req.params.card_id;
    let param = {
        userId: USER_ID,
        cardId: CARD_ID
    };
    Collections.delCard(param, function (err, is_deleted) {
        if (err) return next(err);
        if(is_deleted) {
            let status = 200;
            let json = ResFormat(status, "Card with id='" + CARD_ID + "' deleted.");
            return res.status(status).send(JSON.stringify(json));
        } else {
            let status = 404;
            let json = ResFormat(status, "Card with id='" + CARD_ID + "' isn't in collection.");
            return res.status(status).send(JSON.stringify(json));
        }
    });
});

module.exports = router;
