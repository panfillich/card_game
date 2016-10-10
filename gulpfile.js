// подключаем gulp
var gulp = require('gulp');

// Подключаем gulp-sass
var sass = require('gulp-sass');

// подключаем gulp-nodemon
var nodemon = require('gulp-nodemon');

// Отслеживаем изменения во всех файлах кроме нижеперечисленных
gulp.task('run', function() {
    nodemon({
        script: 'local.js',
        ext: 'js html json scss',
        env: { NODE_ENV: 'local' },
        legacyWatch: true,
        ignore: [
            'public/css/**',
            'node_modules/**',
            '.git/**',
            '.vagrant/**',
            '.idea/**'
        ]
    });
    gulp.watch(__dirname + '/public/scss/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
    // Получаем все файлы с окончанием .scss в папке public/scss и дочерних директориях
    return gulp.src('public/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
});