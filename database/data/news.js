let get_fish_text = require('../../lib/fish_text');

let list_articles = [];
let cur_num_articles  = 0;
let count_articles = 10;

module.exports = {
    up: function (queryInterface, Sequelize) {
        while (cur_num_articles<count_articles) {
            list_articles.push({
                title: get_fish_text(1),
                keywords: get_fish_text(10), //10 слов
                description: get_fish_text(10),
                language: 'en',
                robots: 'index',
                articleText: get_fish_text(250),
                commentStatus: 1,
                type: 1,
                publishStatus: 1,
                publishAt: new Date(3000, 1, 1, 0, 0, 0, 0)
            });
            cur_num_articles++;
        }
        queryInterface.bulkInsert('articles', list_articles, {returning: true})
            .then(function(response){
                //console.log(response)
            });
    },

    down: function (queryInterface, Sequelize) {

    }
};