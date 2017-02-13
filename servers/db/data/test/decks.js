const config       = require('../config');
const collections = require('../../schema/decks').constants;

const cards      = require('../cards');
const LoadPack   = require('../LoadPack');

let get_rand_int    = require('../../../common_libs/random/get_rand_int');

function createNewDecks(param) {
    let cur_num_user = param.current_records;
    let decks = [];

    // Cоздать случайную карту в колоде
    let createCardInDeck = function (cards, deck) {

        let cardIter = get_rand_int(0, cards.length - 1);

        deck.forEach(function (card) {
            if(card.cardId == cards[cardIter].cardId){
                card.count++;
            }
        });

        if(cards[cardIter].count == 1){
            cards.splice(cardIter, 1);
        } else {
            cards[cardIter].count -= 1;
        }
    };

    // Кол-во колод у пользователя
    let createDeckCount = function () {
        return get_rand_int(config.test.decks.count.min, config.test.decks.count.max);
    };


    // Создать колоду
    let createDeck = function(deck_number){
        //Преобразуем массив карт в нужный формат
        let custom_cards = [];
        let custom_deck = [];
        let current_iter_card = 0;

        while(custom_cards.length != cards.length){
            let cardId =  cards[current_iter_card].cardId;
            custom_cards.push({
                cardId: cardId,
                count:  config.test.collection.count
            });
            custom_deck.push({
                cardId: cardId,
                count: 0
            });
            current_iter_card++;
        }

        let created_cards = 0;
        while (created_cards < config.test.decks.count_cards){
            createCardInDeck(custom_cards, custom_deck);
            created_cards ++;
        }

        return custom_deck;
    }


    // Cоздаем колоды
    let count_decks = createDeckCount();
    let current_deck = 1;
    while(current_deck < count_decks){
        let custom_deck = createDeck(current_deck);
        custom_deck.forEach(function (card) {
            if(card.count > 0){
                decks.push({
                    userId: cur_num_user,
                    number: current_deck,
                    cardId: card.cardId,
                    count:  card.count
                });
            }
        });

        current_deck++;
    }

    return decks;
}

module.exports = function (queryInterface, DataTypes, callback) {
    let loadPack = new LoadPack({
        createNewIteration: createNewDecks,
        all_iterations:     config.test.users.count,
        table_name:         collections.table_name,
        pack_iterations:    1000
    });

    console.log(`[${collections.table_name}] start creating`);

    loadPack.insert(queryInterface, DataTypes, callback);
}

