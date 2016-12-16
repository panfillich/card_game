let list_users = [];
let current_num = 0;
let count_user = 10;

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.createTable(
        'users',
        {
          user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          login: Sequelize.STRING(256),
          email: Sequelize.STRING(256),
          password: Sequelize.STRING(256),
          token: Sequelize.STRING(256),
          created_at: {
            type: Sequelize.DATE
          },
          updated_at: {
            type: Sequelize.DATE
          }
        },
        {
          engine: 'InnoDB',                     // default: 'InnoDB'
          charset: 'utf8',
          collate: 'utf8_general_ci'
        }
    );

    while (current_num<count_user) {
      list_users.push({
          login: 'user' + current_num,
          email: 'user' + current_num + '@gmail.com',
          password: '',
          token: '',
          created_at: new Date(),
          updated_at: new Date()
      })
      current_num++;
    }
    queryInterface.bulkInsert('users', list_users);
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('users');
  }
};
