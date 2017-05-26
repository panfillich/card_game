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
    getOneDeck(param, callback) {
        let userId   = param.userId;
        let deck_num = param.deck_num;

        let decks    = this.decks;

        decks.findAll({
            attributes: [
                'cardId',
                'count'
            ],
            where: {
                userId: userId,
                number: deck_num
            }
        }).then(function (data) {
            let result = [];

            data.forEach(function (cards) {
                result.push({
                    'cardId':cards.dataValues.cardId,
                    'count': cards.dataValues.count
                });
            });
            return callback(null, result);
        }).catch(function(error){
            callback(error, null);
        });
    }

    // Проверить существование колоды
    checkDeckNum(param, callback){
        let userId   = param.userId;
        let deck_num = param.deck_num;

        let decks    = this.decks;

        decks.findOne({
            attributes: [
               'number'
            ],
            where: {
                userId: userId,
                number: deck_num
            },
            limit: 1
        }).then(function (data) {
           if(data){
               callback(null, true);
           } else {
               callback(null, false);
           }
        }).catch(function(error){
            callback(error, null);
        });
    }

    // Создать новую колоду
    createNewDeck(param, callback) {
        let userId   = param.userId;
        let deck_num = param.deck_num;
        let cards    = param.cards;

        let decks    = this.decks;

        let sequelize_format_data = [];
        cards.forEach(function (card) {
            sequelize_format_data.push({
                userId: userId,
                number: deck_num,
                cardId: card.cardId,
                count:  card.count
            })
        });

        decks.bulkCreate(sequelize_format_data).then(function (data) {
            callback(null, true);
        }).catch(function(error){
            callback(error, false);
        });
    }

    // Изменить колоду c учетом того что в старой колоде присутствует хотябы 1 карта
    /*changeDeck(param, callback) {
        let userId   = param.userId;
        let deck_num = param.deck_num;
        let cards    = param.cards;

        let decks    = this.decks;
        let db       = this.db;

        this.getOneDeck(param, function (err, old_deck) {
            if(err) return  callback(err);

            let cards_for_insert = [];
            let cards_for_update = {};

            //Делаем валидацию (если в колоду собираются впихнуть больше 30 карт)
            let count = 0;
            for(let key_card_in_old_deck in old_deck){
                let card_in_old_deck = old_deck[key_card_in_old_deck];
                let if_card_found = false;
                for(let key_card_in_new_deck in cards){
                    let card_in_new_deck = cards[key_card_in_new_deck];
                    if(card_in_old_deck.cardId == card_in_new_deck.cardId){
                        if_card_found = true;
                        count += card_in_new_deck.count;
                    }
                }
                if(!if_card_found){
                    count += card_in_old_deck.count;
                }
            }

            if(count > 30){
                return callback(new Error('Final deck will have more then 30 cards'))
            }


            for(let key_card_in_new_deck in cards){
                let card_in_new_deck = cards[key_card_in_new_deck];
                for(let key_card_in_old_deck in old_deck){
                    let card_in_old_deck = old_deck[key_card_in_old_deck];
                    let if_card_found = false;
                    if(card_in_old_deck.cardId == card_in_new_deck.cardId){
                        if(card_in_old_deck.count != card_in_new_deck.count){
                              if(!cards_for_update[card_in_new_deck.count]){
                                  cards_for_update[card_in_new_deck.count] = [];
                              }
                              cards_for_update[card_in_new_deck.count].push(card_in_new_deck.cardId);
                        }
                        if_card_found = true;
                        break;
                    }
                    if(!if_card_found){
                        cards_for_insert.push(card_in_new_deck);
                    }
                }
            }

            // Да жесть конечно, зато запросов в базу меньше...
            db.sequelize.transaction(function (t) {
                let promises = []

                // 0-1 inserts
                if(cards_for_insert.length > 0){
                    let for_insert = [];
                    cards_for_insert.forEach(function () {
                        for_insert.push({
                            userId: userId,
                            number: deck_num,
                            cardId: cards_for_insert.cardId,
                            count:  cards_for_insert.count
                        });
                    });
                    let newPromise = decks.bulkCreate(for_insert, {transaction: t});
                    promises.push(newPromise);
                }

                //0-max_duplicate_in_deck updates
                for(let count_duplicates in cards_for_update){
                    let newPromise = decks.update(
                        {
                            count: count_duplicates
                        },
                        {
                            transaction: t,
                            where: {
                                userId: userId,
                                number: deck_num,
                                cardId: {
                                    in: cards_for_update[count_duplicates]
                                }
                            }
                        }
                    );
                    promises.push(newPromise);
                }
                return Promise.all(promises);
            }).then(function (result) {
                console.log(result);
                return callback(err, true);
            }).catch(function (err) {
                return callback(err, false);
            });
        });
    }*/

    // Удалить колоду
    delDeck(param, callback){
        let userId   = param.userId;
        let deck_num = param.deck_num;

        let decks    = this.decks;
        decks.destroy({
            where: {
                userId: userId,
                number: deck_num
            }
        }).then(function (data) {
            if(data > 0){
                callback(null, true);
            }else {
                callback(null, false);
            }
        }).catch(function(error){
            callback(error, false);
        });
    }
}

module.exports = new Deck();