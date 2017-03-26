module.exports = {
    cur_lang: 'en',

    loader: {
        text: 'Loading...'
    },

    nav:{
        user_greeting: 'Hello, ',
        menu: {
            main    : 'Home',
            news    : 'News',
            chat    : 'Chat',
            deck    : 'Deck',
            game    : 'Game',
            reg     : 'Registration',
            auth    : 'Authorization',
            log_out : 'Exit',
            lang    : 'Language'
        }
    },
    user:{
        def_login: 'Guest'
    },

    articles:{
        title   : 'Atricles',
        header  : 'Atricles',
        next    : 'next...',
        loading_message: "Find articles on the server",
    },

    article:{
        date_of_publication : 'Date of publication',
        loading_message     : "Find article on the server",
    },

    pagination: {
        next    : 'Next',
        previous: 'Previous'
    },

    auth: {
        title   : 'Authorization',
        header  : 'Authorization',
        tagline : "Let's do it!",
        loading_message: "Find a user on the server",
        form:{
            email:{
                label:'Email address:',
                placeholder: 'Enter email',
                text: 'We\'ll never share your email with anyone else.',
            },
            pass:{
                label:'Password',
                placeholder: 'Enter password'
            },
            button:{
                send_form: 'Authorize',
                clear_form: 'Clear'
            },
            error:{
                not_found: 'User not found.'
            }
        },

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
        valid: '',
        required : 'Field is required!',
        invalid: {
            email: 'Invalid Email address (You must to use only these mail services: yandex, google)!',
            password: 'Invalid password (Password must be no less than 8 and no more than 25 characters.)!'
        },
        already_taken: 'Already_taken'
    }
}