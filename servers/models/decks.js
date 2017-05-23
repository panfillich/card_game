

class Deck {
    //Подключаемся к базе
    switchToDB(db) {
        if (db) {
            this.db = db;
            this.decks = this.db.decks;
            return true;
        }
        return false;
    }

    // Получить краткую информацию о колодах
    // Возвращает номер колоды + кол-во карт в ней
    getDecksInfo(param, callback) {
        let userId = param.userId;

        let decks     = this.decks;
        let sequelize = this.db.sequelize;

        decks.findAll({
            attributes: [
                'number',
                [sequelize.fn('SUM', sequelize.col('count')), 'countCards']
            ],
            where: {
                userId: userId
            },
            group: ['number']
        }).then(function (data) {
            let result = [];
            data.forEach(function (data_deck) {
                result.push({
                    'deck_number':data_deck.dataValues.number,
                    'cards_count': data_deck.dataValues.countCards
                });
            });
            callback(null, result);
        }).catch(function(error){
            callback(error, null);
        });
    }

    // Получить инфо об одной колоде
    getOneDeck(){

    }

    // Установить колоду по умолчанию (в сессию)
    setDefaultDeck(userId, deck) {

    }

    // Создать новую колоду
    createNewDeck(userId, deck) {

    }

    // Изменить колоду
    changeDeck(userId, deck) {

    }

    // Удалить колоду
    delDeck(userId, deck){

    }
}

module.exports = new Deck();