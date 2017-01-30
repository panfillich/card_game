let get_fish_text   = require('../../../common_libs/fish_text');
let config          = require('../config').test;
let constants       = require('../../schema/articles').constants;
let get_rand_attr   = require('../../../common_libs/random/get_rand_attr');

let log             = console.log;

function createNewArticle() {
    let language = get_rand_attr(config.language);
    return {
        title: get_fish_text(1, language),
        keywords: get_fish_text(10, language), //10 слов
        description: get_fish_text(9, language),
        language: language,
        robots: constants.robots.INDEX,
        articleText: get_fish_text(250, language),
        commentStatus: constants.commentStatus.ON,
        type: get_rand_attr(constants.type),
        publishStatus: constants.publishStatus.PUBLISH,
        publishAt: new Date(2016, 1, 1, 0, 0, 0, 0)
    }
}


let inserted_articles = 0;

const count_all_articles = config.articles.count;
const count_pack_value = 1000;

function createPack() {
    
}

function insert(queryInterface, DataTypes, data, callback) {
    queryInterface.bulkInsert(constants.table_name, data)
        .then(function(result){
            log(result)
            log(`[${constants.table_name}]: data added`);
            if(callback){
                callback();
            }
        }).catch(function (error) {
        //log(`[${data.table_name}]: data wasn't added`);
        log(`[${constants.table_name}]: '${error}'`);
    });
}

module.exports = function (queryInterface, DataTypes, callback) {


}

/*
let list_articles = [];
let cur_num_articles  = 0;
let count_articles = config.test.articles;

while (cur_num_articles<count_articles) {
    let language = get_rand_attr(constants.language);
    list_articles.push({
        title: get_fish_text(1, language),
        keywords: get_fish_text(10, language), //10 слов
        description: get_fish_text(9, language),
        language: language,
        robots: constants.robots.INDEX,
        articleText: get_fish_text(250, language),
        commentStatus: constants.commentStatus.ON,
        type: get_rand_attr(constants.type),
        publishStatus: constants.publishStatus.PUBLISH,
        publishAt: new Date(2016, 1, 1, 0, 0, 0, 0)
    });
    cur_num_articles++;
}

module.exports = {
    table_name: constants.table_name,
    list_data: list_articles,
    properties: {

    }
}
*/