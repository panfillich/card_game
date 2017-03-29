class Friends{
    //Подключаемся к базе
    switchToDB(db){
        if(db){
            this.db = db;
            this.friends = this.db.friends;
            this.users = this.db.users
            return true;
        }
        return false;
    }

    //Получить друзей пользователя
    //param: {
    //  userId
    //}
    getAllFriends(param, callback){
        let friends = this.friends;
        let users = this.users;

        friends.findAll({
            attributes: [
                'recordId', 'createdAt'
            ],
            where: {
                userId : param.userId
            },
            include: [{
                model: users,
                as: 'user',
                attributes: ['login'],
                required: true
            }],
            order: [
                ['createdAt', 'DESC'],
            ]
        }).then(function(data) {
            let result = [];
            if (data.length > 0){
                data.forEach(function (item) {
                    result.push({
                        'recordId'  : item.dataValues.recordId,
                        'createdAt' : item.dataValues.createdAt,
                        'login' : item.dataValues.user.login
                    });
                });
            }
            callback(null, result);
        }).catch(function(error){
            callback(error, []);
        });
    }
}

module.exports = new Friends();