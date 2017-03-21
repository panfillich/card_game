const consts = require('../consts/articles');

let get_schema = function(Sequelize, DataTypes){
    return {
        table_name: consts.table_name,
        fields: {
            articleId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: DataTypes.STRING(50),
            keywords: DataTypes.STRING(200), //10 слов
            description: DataTypes.STRING(140),
            language: { //< meta http-equiv="content-language" content="ru">
                type:DataTypes.STRING(2),
                defaultValue: consts.language.EN
            },
            robots: {
                type:DataTypes.STRING(8),
                defaultValue: consts.robots.INDEX
            },
            articleText: {
                type:DataTypes.TEXT('medium')
            },
            commentStatus: {
                type: DataTypes.INTEGER(2),
                defaultValue: consts.commentStatus.ON
            },
            type: {
                type: DataTypes.INTEGER(2),
                defaultValue: consts.type.NEWS
            },
            publishStatus: {
                type: DataTypes.INTEGER(2),
                defaultValue: consts.publishStatus.PUBLISH
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
            },
            {
                fields: ['publishStatus', 'type', 'articleId'],
                properties: {
                    indexName: 'status_article',
                    indicesType: 'UNIQUE'
                }
            }
        ],
        const: consts
    }
}

module.exports = {
    constants:  consts,
    get_schema: get_schema
}
