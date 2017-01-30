let config          = require('../config.js');
let constants       = require('../../schema/comments').constants;

let get_rand_int    = require('../../../common_libs/random/get_rand_int');
let get_fish_text   = require('../../../common_libs/fish_text/index');

const LoadPack      = require('../LoadPack');


function createNewComments(param) {
    let article_id = param.current_records;
    let comments_count = get_rand_int(
        config.test.articles.comments.count.min,
        config.test.articles.comments.count.max
    );

    let current_comment = 0;
    let list_comments = [];
    while(current_comment<comments_count){
        let user_id          = get_rand_int(1, config.test.users.count);
        let comment_length  = get_rand_int(
            config.test.articles.comments.words.min,
            config.test.articles.comments.words.max
        );

        list_comments.push({
            status: constants.status.VISIBLE,
            articleId: article_id,
            userId: user_id,
            comment: get_fish_text(comment_length),
            createdAt: new Date(),
        });

        current_comment++;
    }
    return list_comments;
}


module.exports = function (queryInterface, DataTypes, callback) {

    let loadPack = new LoadPack({
        createNewIteration: createNewComments,
        all_iterations:     config.test.articles.count,
        table_name:         constants.table_name,
        pack_iterations:    1000
    });

    console.log(`[${constants.table_name}] start creating`);

    loadPack.insert(queryInterface, DataTypes, callback);
}





