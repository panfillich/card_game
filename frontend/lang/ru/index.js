module.exports = {
    lang: 'ru',
    nav:{
        user_greeting: 'Привет, ',
        menu: {
            main: 'Главная',
            news: 'Новости',
            reg:  'Регистрация',
            auth: 'Авторизация',
            log_out: 'Выход',
            lang: 'Язык'
        }
    },

    user:{
        def_login: 'Гость'
    },

    auth: {
        title: 'Авторизация',
        header: 'Авторизация',
        tagline: 'Просто сделай это!',
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
                name: 'Автризироваться'
            },
            error:{}
        }
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
            email: 'Невалидный Email (Вы можете использовать только следующие сервисы: yandex, google)!',
            password: 'Невалидный пароль (Пароль не может быть меньше 8 и больше 25 символов)!'
        }
    }
}