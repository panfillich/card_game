let random_words = [
    'fish', 'meat', 'pork', 'biscuits', 'cucumber', 'pop-corn', 'milk',
    'banana', 'drink', 'beer', 'food', 'and', 'is', 'not', 'water',
    'potatoes', 'tomatoes', 'sandwich', 'cup of tee', 'cup of coffee'
];

function get_fish_text(count, random_words) {
    let fish_text_arr = [];
}

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
            gameTokenCreate: new Date()//,
            /*createdAt: new Date(),
            updatedAt: new Date()*/
        });
        current_num++;
    }
    queryInterface.bulkInsert('users', list_users);


    let list_news = [];
    let cur_num_news  = 0;
    let count_news = 10;


}

module.exports = {
    up: add_data
}