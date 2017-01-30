let get_fish_text   = require('../../../common_libs/fish_text');
let config          = require('../config');
let constants       = require('../../schema/articles').constants;
let get_rand_attr   = require('../../../common_libs/random/get_rand_attr');

const LoadPack      = require('../LoadPack');

function createNewArticle() {
    let language = get_rand_attr(config.test.language);
    return [{
        title: get_fish_text(1, language),
        keywords: get_fish_text(10, language), //10 слов
        description: get_fish_text(5, language),
        language: language,
        robots: constants.robots.INDEX,
        articleText: get_fish_text(250, language),
        commentStatus: constants.commentStatus.ON,
        type: get_rand_attr(constants.type),
        publishStatus: constants.publishStatus.PUBLISH,
        publishAt: new Date(2016, 1, 1, 0, 0, 0, 0)
    }];
}

module.exports = function (queryInterface, DataTypes, callback) {

    let loadPack = new LoadPack({
        createNewIteration: createNewArticle,
        all_iterations:     config.test.articles.count,
        table_name:         constants.table_name,
        pack_iterations:    4000
    });

    console.log(`[${constants.table_name}] start creating`);

    loadPack.insert(queryInterface, DataTypes, callback);
}

