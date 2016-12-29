const constants = {
    language: {
        EN : 'en',
        RU : 'ru'
    },
    robots: {
        //robots — мета-тег, который отвечает за настройки индексирования страницы.
        // У мета-тега «robots» могут быть следующие значения:
        INDEX:      'index',    //index — страница индексируется;
        NOINDEX:    'noindex',  //noindex — страница не индексируется;
        FOLLOW:     'follow',   //follow — гиперссылки на странице учитываются;
        NOFOLLOW:   'nofollow', //nofollow — гиперссылки на странице не учитываются
        ALL:        'all',      //all — заменяет «index» и «follow», т.е. страница индексируется и гиперссылки на ней
                                //учитываются (действует по умолчанию);
        NONE:       'none'      //none — заменяет «noindex» и «nofollow», т.е. страница не индексируется и г
                                //иперссылки на ней не учитываются.
    },
}

module.exports = function(Sequelize, DataTypes){
    return {
        table_name: 'articles',
        fields: {
            articlesId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: DataTypes.STRING(50),
            keywords: DataTypes.STRING(200), //10 слов
            description: DataTypes.STRING(140),
            language: {
                type:DataTypes.STRING(2),
                defaultValue: constants.language.EN
            }, //< meta http-equiv="content-language" content="ru">

            robots: {
                type:DataTypes.STRING(8),
                defaultValue: constants.robots.INDEX,
                comment: "мета-тег, который отвечает за настройки индексирования страницы"
            },
            articleText: {
                type:DataTypes.TEXT('medium')
            },
            commentStatus: {
                type: DataTypes.INTEGER(2),
                defaultValue: 0,
                comment:
                '0 - без комментариев; ' +
                '1 - комментарии включены; ' +
                '2 - комментарии видны, но добавление новых запрещено; '
            },
            type: {
                type: DataTypes.INTEGER(2),
                defaultValue: 0
                // 0 - без категории
                // 1 - новости
                // 2 - гайды
                // 3 - тех. моменты
            },
            publishStatus: {
                type: DataTypes.INTEGER(2),
                defaultValue: 0
                // 0 - не опубликован
                // 1 - опубликован
            },
            publishAt: {
                type: DataTypes.DATE
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        },
        properties:  {
            engine: 'MYISAM', // default: 'InnoDB'
            charset: 'utf8',
            collate: 'utf8_general_ci'
        },
        indexes: [],
        const: constants
    }
}
