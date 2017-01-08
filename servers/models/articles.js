let common_libs = '../common_libs/';

class Articles{
    constructor(db){
        this.articles = db.articles;
    }

    //Получаем информацию пользователя для авторизации
    //param: {
    //  publishStatus,
    //  type,
    //  articleId
    //}
    get_article(param, callback){
        users.findOne({
            where: {
                publishStatus: param.publishStatus,
                type: param.type,
                articleId: param.articleId
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

    //получаем токен и дату
    get token(){

    }

    //Устанавливаем токен и дату
    set token(param){

    }

    //создаем нового пользователя
    set new_user(param){

    }
}

module.exports = Articles;