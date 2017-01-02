module.exports = function (config) {

    let initialisers = [
        require('./autentification'),
        require('./test'),
        require('./errors')
    ];

    initialisers.forEach(function (initializer) {
        initializer(config);
    });
}
