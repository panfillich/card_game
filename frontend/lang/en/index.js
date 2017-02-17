module.exports = {
    lang: 'en',
    nav:{
        user_greeting: 'Hello, ',
        menu: {
            main: 'Home',
            news: 'News',
            reg:  'Registration',
            auth: 'Authorization',
            log_out: 'Exit',
            lang: 'Language'
        }
    },
    user:{
        def_login: 'Guest'
    },

    auth: {
        title: 'Authorization',
        header: 'Authorization',
        tagline: "Let's do it!",
        form:{
            email:{
                label:'Email address:',
                placeholder: 'Enter email',
                text: 'We\'ll never share your email with anyone else.',
            },
            password:{
                label:'Password',
                placeholder: 'Enter password'
            },
            button:{
                name: 'Authorize'
            },
            error:{}
        }
    },

    reg: {
        title: 'Registration',
        header: 'Registration',
        tagline: "Let's do it!",
        form:{
            label:{
                email: 'Email address:',
                password: 'Password:'
            },
            error:{}
        }
    },

    validate: {
        is_valid: '',
        required : 'Field is required!',
        invalid: {
            email: 'Invalid Email address (You must to use only these mail services: yandex, google)!',
            password: 'Invalid password (Password must be no less than 8 and no more than 25 characters.)!'
        }
    }
}