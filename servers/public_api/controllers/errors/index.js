module.exports = function (config) {

    let initialisers = [
        require('./404'),
        require('./500'),
        require('./example')
    ];

    initialisers.forEach(function (initializer) {
        initializer(config);
    });
}