class Collections{
    //Подключаемся к базе
    switchToDB(db){
        if(db){
            this.db = db;
            this.collections = this.db.collections;
            return true;
        }
        return false;
    }
}

module.exports = new Collections();