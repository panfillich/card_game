module.exports = {
    data: [
        "common",
        "test"
    ],
    test : {
        users: {
            //количество пользователей
            count: 5000000,
            //шаблоны (%(id)s - порядковый номер)
            email: 'email-%(id)s@gmail.com',
            login: 'login-%(id)s',
            password: 'Qwerty123!'
        },
        articles: {
            //количество статей
            count: 6000,
            comments: {
                //Число комментариев к статье
                count: {
                    min: 0,
                    max: 20
                },
                //Cлов в 1м комментарии
                words: {
                    min: 1,
                    max: 16
                }
            }
        },
        messages: {
            count: 70
        },
        language: ["en", "ru"]
    }
}