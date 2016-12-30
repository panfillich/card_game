let config = require('../config.json');
let constants = require('../../schema/comments').constants;

let get_rand_int = require('../../../common_libs/random/get_rand_int');
let get_fish_text = require('../../../common_libs/fish_text/index');

let list_comments = [];

for (let articleId = 1; articleId<=config.test.articles; articleId++){
    let comments_count = get_rand_int(config.test.min_comments, config.test.max_comments);
    let current_comment = 0;
    let push_comments = [];
    while(current_comment<comments_count){
        let userId = get_rand_int(1, config.test.users);
        let comment_length = get_rand_int(config.test.min_comments_length, config.test.max_comments_length);
        list_comments.push({
            status: constants.status.VISIBLE,
            articleId: articleId,
            userId: userId,
            comment: get_fish_text(comment_length),
            createdAt: new Date(),
        });
        current_comment++;
    }
}

module.exports = {
    table_name: constants.table_name,
    list_data: list_comments,
    properties: {

    }
}