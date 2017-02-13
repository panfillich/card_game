const config    = require('../config');
const constants = require('../../schema/cards').constants;
const cards      = require('../cards');
const LoadPack  = require('../LoadPack');

function createCards() {

    return cards;
}

module.exports = function (queryInterface, DataTypes, callback) {
    let loadPack = new LoadPack({
        createNewIteration: createCards,
        all_iterations:     1,
        table_name:         constants.table_name,
        pack_iterations:    1
    });

    console.log(`[${constants.table_name}] start creating`);

    loadPack.insert(queryInterface, DataTypes, callback);
}

