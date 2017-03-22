module.exports = {
    cur_lang: 'ru',

    loader: {
        text: 'Загрузка...'
    },

    nav:{
        user_greeting: 'Привет, ',
        menu: {
            main: 'Главная',
            news: 'Новости',
            deck: 'Колода',
            game: 'Игра',
            reg:  'Регистрация',
            auth: 'Авторизация',
            log_out: 'Выход',
            lang: 'Язык'
        }
    },

    user:{
        def_login: 'Гость'
    },

    articles:{
        title: 'Atricles',
        header: 'Atricles',
        loading_message: "Find articles on the server",
    },

    atricle:{
        loading_message: "Find article on the server",
    },

    auth: {
        title: 'Авторизация',
        header: 'Авторизация',
        tagline: 'Просто сделай это!',
        loading_message: "Поиск пользователя на сервере",
        form:{
            email:{
                label:'Email адрес:',
                placeholder: 'Введите Email',
                text: 'Мы не передаем личные данные третьим лицам.'
            },
            pass:{
                label:'Пароль:',
                placeholder: 'Введите пароль'
            },
            button:{
                send_form: 'Автризироваться',
                clear_form: 'Очистить'
            },
            error:{
                not_found: 'Пользователь не найден.'
            }
        },
     },

    reg: {
        title: 'Регистрация',
        header: 'Регистрация',
        tagline: 'Просто сделай это!',
        form:{
            label:{
                email: 'Email address:',
                password: 'Password:'
            },
            error:{}
        }
    },

    validate: {
        valid: '',
        required : 'Обязательное поле',
        invalid: {
            email: 'Невалидный Email (Вы можете использовать только следующие сервисы: yandex, google)',
            password: 'Невалидный пароль (Пароль не может быть меньше 8 и больше 25 символов)'
        },
        already_taken: 'Уже занят'
    }
}