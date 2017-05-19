class Deck{
    //Подключаемся к базе
    switchToDB(db){
        if(db){
            this.db = db;
            this.deck = this.db.deck;
            return true;
        }
        return false;
    }
}

module.exports = new Deck();