let express     = require('express');
let router      = express.Router();

let Decks       = require('../../models/decks');
let ResFormat   = require('../../common_libs/res_format');

// Получить краткую информацию о колодах
router.get('/', function(req, res, next) {
    const USER_ID = req.session.get('userId');
    Decks.getDecksInfo({userId:USER_ID}, function (err, result) {
        if (err) return next(err);
        let status = 200;
        let json = ResFormat(status, 'User decks info', {decks_info: result});
        return res.status(status).send(JSON.stringify(json));
    });
});

// Удалить/очистить колоду
router.delete('/:deck_num([0-9]{1,4})', function (req, res, next) {
    const USER_ID = req.session.get('userId');

});

// Добавить колоду
router.post('/:deck_num([0-9]{1,4})', function (req, res, next) {
    const USER_ID = req.session.get('userId');
    const CARD_ID = req.params.deck_num;
});

// Изменить колоду полностью
router.put('/:deck_num([0-9]{1,4})', function (req, res, next) {
    const USER_ID = req.session.get('userId');
    const CARD_ID = req.params.deck_num;
});

// Добавить часть в колоду
router.patch('/:deck_num([0-9]{1,4})', function (req, res, next) {
    const USER_ID = req.session.get('userId');
    const CARD_ID = req.params.deck_num;
});

module.exports = router;
