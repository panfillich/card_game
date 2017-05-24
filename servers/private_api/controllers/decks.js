let express     = require('express');
let router      = express.Router();

let Decks       = require('../../models/decks');
let Collections = require('../../models/collections');
let ResFormat   = require('../../common_libs/res_format');

function checkBody(body, param) {
    let def_param = {
        max_count_cards: 30,
        min_count_cards: 1,
        max_duplicate: 3
    };

    if(!param){
        param = def_param;
    } else {
        param = Object.assign(def_param, param);
    }

    // нет нужного параметра
    if(!body.cards){
        return false;
    }

    // параметр не массив
    if(!Array.isArray(body.cards)){
        return false;
    }

    // проверяем кол-во карт
    if(body.cards.length < param.min_count_cards || body.cards.length > param.max_count_cards){
        return false;
    }

    // смотрим структуру массива/карт
    for (let key in body.cards){
        let card = body.cards[key];
        if(!card.cardId || !card.count){
            return false;
        }

        if(!Number.isInteger(card.cardId) || !Number.isInteger(card.count)){
            return false;
        }

        if(card.count > param.max_duplicate){
            return false;
        }
    }

    return true;
}

function checkCardsAndCollection(cards, collection) {
    return true;
}

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

// Получить полную инфу о колоде
router.get('/:deck_num([0-9]{1,1})', function(req, res, next) {
    const USER_ID = req.session.get('userId');
    const DECK_NUM = req.params.deck_num;
    let param = {
        userId: USER_ID,
        deck_num: DECK_NUM
    };

    Decks.getOneDeck(param, function (err, result) {
        if (err) return next(err);

        if(result.length == 0){
            let status = 404;
            let json = ResFormat(status, 'User deck #' + DECK_NUM + " didn't find");
            return res.status(status).send(JSON.stringify(json));
        }

        let status = 200;
        let json = ResFormat(status, 'User deck #'+DECK_NUM, {deck: result});
        return res.status(status).send(JSON.stringify(json));
    });
});

// Удалить/очистить колоду
router.delete('/:deck_num([0-9]{1,1})', function (req, res, next) {
    const USER_ID = req.session.get('userId');
    const DECK_NUM = req.params.deck_num;
    let param = {
        userId: USER_ID,
        deck_num: DECK_NUM
    };
});

// Добавить новую колоду
router.post('/:deck_num([0-9]{1,1})', function (req, res, next) {
    const USER_ID = req.session.get('userId');
    const DECK_NUM = req.params.deck_num;
    const MESSAGE = "Can't create new deck #" + DECK_NUM + ", because this deck "

    let param = {
        userId: USER_ID,
        deck_num: DECK_NUM
    };

    //Проверяем валидность тела запроса
    if(!checkBody(req.body)){
        let status = 400;
        let json = ResFormat(status, MESSAGE + "has invalid body");
        return res.status(status).send(JSON.stringify(json));
    }

    // Смотрим существует ли колода с данным номером
    Decks.checkDeckNum(param, function (err, is_deck_exist) {
        if (err) return next(err);

        if (is_deck_exist) {
            let status = 400;
            let json = ResFormat(status, MESSAGE + "is already exist");
            return res.status(status).send(JSON.stringify(json));
        }

        // Если колода существует, то проверяем а есть ли вообще такие карты в коллекции пользователя (да еще в нужном кол-ве)
        Collections.getCollection(param, function (err, collection) {
            if (err) return next(err);

            // Проверяем есть ли карты колоды в коллекции
            if(!checkCardsAndCollection(req.body.cards, collection)){
                let status = 400;
                let json = ResFormat(status, MESSAGE + " contains cards that are not in the collection");
                return res.status(status).send(JSON.stringify(json));
            }

            let status = 200;
            let json = ResFormat(status, 'deck #'+DECK_NUM, collection);
            return res.status(status).send(JSON.stringify(json));

        });
    });
});

// Изменить колоду полностью
router.put('/:deck_num([0-9]{1,1})', function (req, res, next) {
    const USER_ID = req.session.get('userId');
    const CARD_ID = req.params.deck_num;
});

// Добавить часть в колоду
router.patch('/:deck_num([0-9]{1,1})', function (req, res, next) {
    const USER_ID = req.session.get('userId');
    const CARD_ID = req.params.deck_num;
});

module.exports = router;
