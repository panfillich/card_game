const config       = require('../config');
const collections = require('../../schema/decks').constants;

const cards      = require('../cards');
const LoadPack   = require('../LoadPack');

let get_rand_int    = require('../../../common_libs/random/get_rand_int');

function createNewCollection(param) {
    let cur_num_user = param.current_records;
    let cards_iter = 1;
    let collection = [];
    while (cards_iter <= cards.length){
        collection.push({
            userId: cur_num_user,
            cardId: cards_iter,
            count:  config.test.collection.count
        });
        cards_iter++;
    }
    return collection;
}

module.exports = function (queryInterface, DataTypes, callback) {

    let loadPack = new LoadPack({
        createNewIteration: createNewCollection,
        all_iterations:     config.test.users.count,
        table_name:         collections.table_name,
        pack_iterations:    5000
    });

    console.log(`[${collections.table_name}] start creating`);

    loadPack.insert(queryInterface, DataTypes, callback);
}

