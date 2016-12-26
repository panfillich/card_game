// http://www.seoded.ru/beginner/html/metategs.html#4
module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            'articles',
            {
                articlesId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                title: Sequelize.STRING(50),
                keywords: Sequelize.STRING(200), //10 слов
                description: Sequelize.STRING(140),
                language: {
                    type:Sequelize.STRING(2),
                    defaultValue: 'en'
                }, //< meta http-equiv="content-language" content="ru">

                robots: {
                    type:Sequelize.STRING(8),
                    defaultValue: 'index'
                },
                //robots — мета-тег, который отвечает за настройки индексирования страницы.
                // У мета-тега «robots» могут быть следующие значения:
                //index — страница индексируется;
                //noindex — страница не индексируется;
                //follow — гиперссылки на странице учитываются;
                //nofollow — гиперссылки на странице не учитываются
                //all — заменяет «index» и «follow», т.е. страница индексируется и гиперссылки на ней учитываются (действует по умолчанию);
                //none — заменяет «noindex» и «nofollow», т.е. страница не индексируется и гиперссылки на ней не учитываются.
                article: {
                    type:Sequelize.TEXT('medium')
                },
                comment: {
                    type: Sequelize.INTEGER(2),
                    defaultValue: 0
                    // 0 - без комментариев
                    // 1 - комментарии включены
                    // 2 - комментарии видны, но добавление новых запрещено
                },
                type: {
                    type: Sequelize.INTEGER(2),
                    defaultValue: 0
                    // 0 - без категории
                    // 1 - новости
                    // 2 - гайды
                    // 3 - тех. моменты
                },
                status: {
                    type: Sequelize.INTEGER(2),
                    defaultValue: 0
                    // 0 - не опубликован
                    // 1 - опубликован
                },
                publishAt: {
                    type: Sequelize.DATE
                },
                createdAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
                }
            },
            {
                engine: 'MYISAM',                     // default: 'InnoDB'
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('articles');
    }
};
