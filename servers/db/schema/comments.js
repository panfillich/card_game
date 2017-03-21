const consts = require('../consts/comments');

let get_schema = function(Sequelize, DataTypes){
    return {
        table_name: consts.table_name,
        fields: {
            commentId: {
                type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
            },
            status: {
                type: DataTypes.INTEGER(2),
                defaultValue: consts.status.VISIBLE
                // 0 - не опубликован
                // 1 - опубликован
            },
            articleId: {
                type: DataTypes.INTEGER
            },
            userId: {
                type: DataTypes.INTEGER
            },
            comment: {
                type:DataTypes.TEXT('tiny')
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
        properties: {
            engine: 'MYISAM',  // default: 'InnoDB'
            charset: 'utf8',
            collate: 'utf8_general_ci'
        },
        indexes: [
            /*{
                fields: ['status', 'articleId', 'createdAt'],
                properties: {
                    indexName: 'status_article_date'
              }
            }*/
        ],
        const: consts
    }
}

module.exports = {
    constants: consts,
    get_schema: get_schema
}