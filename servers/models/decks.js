

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
    getDecksInfo(userId, callback) {
        let decks = this.deck;

        decks.findAll({});
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