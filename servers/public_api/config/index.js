module.exports = function (config) {

    let initialisers = [
        require('./bodyParser'),
        require('./resHeaders'),
        require('./helmet')
    ];

    initialisers.forEach(function (initializer) {
        initializer(config);
    });
}

