exports.home = function (req, res) {
    /*res.render('pages/body', {
        title   : 'Home page',
        message : 'This is the "home" action of "pages" controller',
        url     :  req.originalUrl
    })*/
    res.render('pages/home.html', { what: 'best', who: 'me' });
}

exports.game = function (req, res) {
    res.render('pages/game.html', { title: 'The best game', who: 'me' });
}