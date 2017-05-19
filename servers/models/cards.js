class Cards{
    //Подключаемся к базе
    switchToDB(db){
        if(db){
            this.db = db;
            this.cards = this.db.cards;
            return true;
        }
        return false;
    }
}

module.exports = new Cards();