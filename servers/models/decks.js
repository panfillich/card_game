class Deck {
    //Подключаемся к базе
    switchToDB(db) {
        if (db) {
            this.db = db;
            this.deck = this.db.deck;
            return true;
        }
        return false;
    }

    // Взять все колоды
    getAllDeck(userId) {

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