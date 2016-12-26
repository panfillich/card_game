let get_fish_text = require('../../lib/fish_text');

let add_data = function (queryInterface, Sequelize) {
    let list_users = [];
    let cur_num_user = 0;
    let count_user = 10;

    while (cur_num_user<count_user) {
        list_users.push({
            login: 'user' + cur_num_user,
            email: 'user' + cur_num_user + '@gmail.com',
            password: '',
            webToken: '',
            webTokenCreate: new Date(),
            gameToken: '',
            gameTokenCreate: new Date()
        });
        cur_num_user++;
    }
    queryInterface.bulkInsert('users', list_users);


    let list_articles = [];
    let cur_num_articles  = 0;
    let count_articles = 10;

    while (cur_num_articles<count_articles) {
        list_articles.push({
            title: get_fish_text(1),
            keywords: get_fish_text(10), //10 слов
            description: get_fish_text(15),
            language: 'en',
            robots: 'index',
            article: get_fish_text(250),
            comment: 1,
            type: 1,
            status: 1,
            publishAt: new Date(3000, 1, 1, 0, 0, 0, 0)
    });
        cur_num_articles++;
    }
    queryInterface.bulkInsert('articles', list_articles);



}

module.exports = {
    up: add_data
}