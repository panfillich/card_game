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
            attributes: [
                'cardId',
                'count'
            ],
            where: {
                userId: userId,
                cardId: {
                    in: cards
                }
            }
        }).then(function(data) {
            let result = [];

            cards.forEach(function (cardId) {
                result.push({cardId: cardId, count: 0});
            });

            data.forEach(function (data_card) {
                for (let key_card in result){
                    if(result[key_card].cardId == data_card.dataValues.cardId){
                        result[key_card].count = data_card.dataValues.count;
                        break;
                    }
                }
            });
            callback(null, result);
        }).catch(function(error){
            callback(error, null);
        });
    }

    // Удалить карту из коллекции
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
                callback(null, false);
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

        let collections = this.collections;
        let db = this.db;

        // Смотрим есть ли эта карта в коллекции
        this.checkCountCards(param, function (err, all_cards) {
            if(err){
                return callback(err, null);
            }

            let for_insert = [];
            let for_update = [];

            all_cards.forEach(function (card) {
                if(card.count == 0){
                    for_insert.push({
                        userId: userId,
                        cardId: card.cardId,
                        count : 1
                    });
                } else if (card.count > 0){
                    for_update.push(card.cardId);
                }
            });

            db.sequelize.transaction(function (t) {
                let promises = []
                if(for_insert.length > 0){
                    let newPromise = collections.bulkCreate(for_insert, {transaction: t});
                    promises.push(newPromise);
                }

                if(for_update.length > 0) {
                    let newPromise = collections.update(
                        {
                            count: db.sequelize.literal('`count` + 1')
                        },
                        {
                            transaction: t,
                            where: {
                                userId: userId,
                                cardId: {
                                    in: for_update
                                }
                            }
                        }
                    );
                    promises.push(newPromise);
                }

                return Promise.all(promises);
            }).then(function (result) {
                return callback(err, true);
            }).catch(function (err) {
                return callback(err, false);
            });
        });
    }
}

module.exports = new Collections();