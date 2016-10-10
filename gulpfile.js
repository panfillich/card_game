var gulp = require('gulp');
// var browserSync = require('browser-sync');
//
// gulp.task('run', function() {
//     browserSync({
//         server: {
//             baseDir: 'server'
//         },
//     })
// })

var nodemon = require('gulp-nodemon');

gulp.task('run', function() {
    return nodemon({
        script: 'local.js',
        ext: 'js html json',
        env: { NODE_ENV: 'local' },
        legacyWatch: true,
        ignore: [
            'public/**',
            'node_modules/**',
            '.git/**',
            '.vagrant/**',
            '.idea/**'
        ]
    });
});

//

