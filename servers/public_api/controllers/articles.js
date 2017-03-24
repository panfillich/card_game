let express     = require('express');
let router      = express.Router();

let Articles    = require('../../models/articles');
let ResFormat   = require('../../common_libs/res_format');

let articles_const = require('../../db/consts/articles');

//Получить статью по Id
router.get('/:article_id([0-9]{1,10}$)', function(req, res, next) {
    const ARTICLE_ID = req.params.article_id;
    const PARAMS = {
        articleId     : ARTICLE_ID,
        publishStatus : articles_const.publishStatus.PUBLISH,
        type          : articles_const.type.NEWS
    };
    Articles.getArticle(PARAMS, function (err, result) {
        if(err){
            let status = 500;
            let json = ResFormat(status, 'Errors with DB');
            return res.status(status).send(JSON.stringify(json));
        }

        if(!result){
            let status = 404;
            let json = ResFormat(status, 'Articles not found');
            return res.status(status).send(JSON.stringify(json));
        }

        let status = 200;
        let json = ResFormat(status, 'Found article #' + ARTICLE_ID, result);
        return res.status(status).send(JSON.stringify(json));
    })
});

//Получить превьюхи статей (постранично)
router.get('/', function(req, res, next) {

    // Проверяем номер страницы
    let page = 1;
    if(req.query.page){
        let unchecked_page = Number(req.query.page);
        if(unchecked_page >= 1 && unchecked_page <= 5000){
            page = unchecked_page;
        }
    }

    // Проверяем язык
    let language = articles_const.language.EN;
    if(req.query.language){
        if(req.query.language.length <= 3){
            for(const lang in articles_const.language){
                if(articles_const.language[lang] == req.query.language){
                    language = articles_const.language[lang];
                    break;
                }
            }
        }
    }

    let count = 50;

    const PARAMS = {
        language      : language,
        publishStatus : articles_const.publishStatus.PUBLISH,
        type          : articles_const.type.NEWS,
        limit         : count + 1,
        offset        : (page - 1)*count
    };

    Articles.getPreviewArticles(PARAMS, function (err, result) {
        if(err){
            let status = 500;
            let json = ResFormat(status, 'Errors with DB');
            return res.status(status).send(JSON.stringify(json));
        }

        if(result.length == 0){
            let status = 404;
            let json = ResFormat(status, 'Articles not found');
            return res.status(status).send(JSON.stringify(json));
        }

        let is_last_pack = false;
        if(result.length <= count){
            is_last_pack = true;
        } else {
            result.pop();
        }

        let final_result = {
            articles: result,
            is_last_pack: is_last_pack
        }

        let status = 200;
        let json = ResFormat(status, 'Found '+result.length+' articles', final_result);
        return res.status(status).send(JSON.stringify(json));
    });
});

module.exports = router;
