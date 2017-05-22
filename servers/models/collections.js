class Collections{
    //Подключаемся к базе
    switchToDB(db){
        if(db){
            this.db = db;
            this.collections = this.db.collections;
            this.cards = this.db.cards;
            return true;
        }
        return false;
    }

    // param = {
    //      userId: ...,
    //      ...
    // }

    // Берем коллекцию
    getCollection(param, callback){
        let userId      = param.userId;
        let cards       = this.cards;
        let collections = this.collections;

        const ADDICTION_TYPE = 'UsersCollection';

        cards.findAll({
            attributes: [
                'cardId'
            ],
            include:{
                model: collections,
                as: ADDICTION_TYPE,
                attributes: ['count'],
                required: false,
                where: {
                    userId :userId
                }
            }
        }).then(function(data) {
            let result = [];
            if (data.length > 0){
                data.forEach(function (item) {
                    let count = 0;
                    if(item.dataValues[ADDICTION_TYPE] != null){
                        if("count" in item.dataValues[ADDICTION_TYPE]) {
                            count = item.dataValues[ADDICTION_TYPE].count;

                        }
                    }
                    result.push({
                        'cardId': item.dataValues.cardId,
                        'count' : count
                    });
                });
            }
            callback(null, result);
        }).catch(function(error){
            callback(error, null);
        });
    }

    // Проверить есть ли карта в колоде
    // Возвращает кол-во копий этой карты
    checkCountCard(param, callback){
        let userId = param.userId;
        let cardId = param.cardId;

        let collections = this.collections;
        collections.findOne({
            attributes: [
                'count'
            ],
            where: {
                userId: userId,
                cardId: cardId
            }
        }).then(function(data) {
           let count = 0;
           if(data){
               count = data.dataValues.count
           }
           callback(null, count);
        }).catch(function(error){
           callback(error, null);
        });
    }

    // Проверяем есть ли карты в колоде
    // Возвращаем кол-во карт
    checkCountCards(param, callback){
        let userId = param.userId;
        let cards  = param.cards;

        let collections = this.collections;
        collections.findAll({

        });
    }

    // Удалить карту/карты из коллекции
    delCard(param, callback){
        let userId = param.userId;
        let cardId = param.cardId;

        let collections = this.collections;

        // Смотрим есть ли эта карта в коллекции
        this.checkCountCard(param, function (err, count) {
            if(err){
                return callback(err, null);
            }

            if (count == 0){ // Запись уже удалена
                callback(null, true);
            } else if(count == 1){ // Удаляем запись
                collections.destroy({
                    where: {
                        userId: userId,
                        cardId: cardId
                    }
                }).then(function (result) {
                    callback(null, true);
                }).catch(function(error){
                    callback(error, null);
                });
            } else {   // Уменьшаем count
                collections.update(
                {
                    count:  count - 1,
                },
                {
                    where: {
                        userId: userId,
                        cardId: cardId
                    }
                }).then(function (result) {
                    callback(null, true);
                }).catch(function(error){
                    callback(error, null);
                });
            }
        });
    }

    // Добавить карту/карты в коллекцию
    addCards(param, callback){
        let userId = param.userId;
        let cards = param.cards;

        let collections = this.collections;

        // Смотрим есть ли эта карта в коллекции
        this.checkCountCards(param, function (err, count) {
            if(err){
                return callback(err, null);
            }

            let data = [];
            cards.forEach(function (cardId) {
                data.push()
            });

            if(count == 0){ // Добавляем новую запись
                collections.bulkCreate(

                ).then(function (result) {
                    callback(null, true);
                }).catch(function(error){
                    callback(error, null);
                });
            } else {   // Увеличиваем count
                collections.update(
                    {
                        count:  count - 1,
                    },
                    {
                        where: {
                            userId: userId,
                            cardId: cardId
                        }
                    }).then(function (result) {
                    callback(null, true);
                }).catch(function(error){
                    callback(error, null);
                });
            }
        });
    }
}

module.exports = new Collections();