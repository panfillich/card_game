const constants = {
    table_name: 'articles',
    language: {
        EN : 'en',
        RU : 'ru'
    },
    robots: {
        //robots — мета-тег, который отвечает за настройки индексирования страницы.
        // У мета-тега «robots» могут быть следующие значения:
        INDEX:      'index',    // index — страница индексируется;
        NOINDEX:    'noindex',  // noindex — страница не индексируется;
        FOLLOW:     'follow',   // follow — гиперссылки на странице учитываются;
        NOFOLLOW:   'nofollow', // nofollow — гиперссылки на странице не учитываются
        ALL:        'all',      // all — заменяет «index» и «follow», т.е. страница индексируется и гиперссылки на ней
                                // учитываются (действует по умолчанию);
        NONE:       'none'      // none — заменяет «noindex» и «nofollow», т.е. страница не индексируется и г
                                // иперссылки на ней не учитываются.
    },
    commentStatus: {
        OFF: 0,         // без комментариев
        ON:  1,         // комментарии включены
        ONLY_SHOW: 2    // комментарии видны, но добавление новых запрещено
    },
    publishStatus: {
        PUBLISH: 1,     // опубликовано
        HIDDEN: 0       // скрыто
    },
    type: {
        NONE: 0,        // без категории
        NEWS: 1,        // новости
        GUIDES: 2,      // гайды
        TECHNICALS: 3   // тех. моменты
    }
}

let get_schema = function(Sequelize, DataTypes){
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
            language: { //< meta http-equiv="content-language" content="ru">
                type:DataTypes.STRING(2),
                defaultValue: constants.language.EN
            },
            robots: {
                type:DataTypes.STRING(8),
                defaultValue: constants.robots.INDEX
            },
            articleText: {
                type:DataTypes.TEXT('medium')
            },
            commentStatus: {
                type: DataTypes.INTEGER(2),
                defaultValue: constants.commentStatus.ON
            },
            type: {
                type: DataTypes.INTEGER(2),
                defaultValue: constants.type.NEWS
            },
            publishStatus: {
                type: DataTypes.INTEGER(2),
                defaultValue: constants.publishStatus.PUBLISH
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
        indexes: [
            {
                fields: ['publishStatus', 'type', 'publishAt'],
                properties: {
                    indexName: 'status_article_date'
                }
            }
        ],
        const: constants
    }
}

module.exports = {
    constants: constants,
    get_schema: get_schema
}
