let common_libs = '../common_libs/';
let constants   = require('../db/schema/articles').constants;

class Articles{
    //Подключаемся к базе
    switchToDB(db){
        if(db){
            this.db = db;
            this.articles = this.db.articles;
            return true;
        }
        return false;
    }

    //Получаем превью статей
    //param: {
    //  language,
    //  commentStatus,
    //  publishStatus,
    //  type
    //}
    getPreviewArticles(param, callback){
        let acticles = this.articles;

        acticles.findAll({
            attributes: [
                'articleId',
                'title',
                'description',
                'publishAt'
            ],
            where: {
                language      : param.language,
                publishStatus : param.publishStatus,
                type          : param.type
            },
            limit: param.limit,
            offset: param.offset,
            order: [
                ['publishAt', 'DESC'],
            ]
        }).then(function(data) {
            let result = [];
            if (data.length > 0){
                data.forEach(function (item) {
                    result.push(item.dataValues);
                });
            }
            callback(null, result);
        }).catch(function(error){
            callback(error, []);
        });
    }

    //Получаем конкретную статью
    getArticle(param, callback){
        let acticles = this.articles;
        acticles.findOne({
            attributes: [
                'articleId',
                'title',
                'keywords',
                'description',
                'publishAt',
                'commentStatus',
                'articleText'
            ],
            where: {
                articleId     : param.articleId,
                language      : param.language,
                publishStatus : param.publishStatus,
                type          : param.type
            }
        }).then(function(project) {
            let result = null;
            if (project){
                result = project.dataValues;
            }
            callback(result, null);
        }).catch(function(error){
            callback(null, error);
        });
    }
}

module.exports = new Articles();