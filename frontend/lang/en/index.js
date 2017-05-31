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
            decks   : 'Decks',
            collection : 'Collection',
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


    decks: {
        title: 'Decks',
        header: 'Decks',

        loading: {
            search: 'Searching decks info in server',
            delete: 'Deleting deck'
        },

        count_cards: '[count cards]:',

        action: {
            add: 'add',
            delete: 'delete',
            edit: 'edit'
        }
    },

    deck: {
        title: 'Deck',
        header: 'Deck',

        loading: {
            collection: 'Searching collection in server',
            deck: 'Searching deck in server',
            save: 'Saving deck'
        },

        back: 'back',
        h_collection: 'All cards in collection',
        h_deck: 'Deck',

        number: '[number]',
        count_cards: '[count cards]',
        count_cards_in_deck: '[cards in deck]',

        action: {
            add: 'add',
            delete: 'delete',
            save_deck: 'Save deck'
        }
    },

    collection: {
        title:  'Collection',
        header:  'Collection',

        loading: {
            search: 'Searching collection in server',
            delete: 'Deleting card from collection'
        },

        count: '[count cards]'
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