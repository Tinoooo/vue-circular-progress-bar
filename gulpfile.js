var Gulp = require('gulp');
var Autoprefixer = require('gulp-autoprefixer');
var BrowserSync = require('browser-sync').create();
var Sass = require('gulp-sass');

const config = {
    destFolder: './dist',
    sourceFolder: './src'
};

Gulp.task('styles', () =>
    Gulp.src(config.sourceFolder + '/scss/circle.scss')
        .pipe(Sass()).on('error', Sass.logError)
        .pipe(Autoprefixer())
        .pipe(Gulp.dest(config.destFolder))
        .pipe(BrowserSync.stream({match: '**/*.css'}))
);

Gulp.task('html', ['styles'], () =>
    Gulp.src(config.sourceFolder + '/index.html')
        .pipe(Gulp.dest(config.destFolder))
);

Gulp.task('default', ['styles', 'html']);

Gulp.task('watch', ['styles', 'html'], () => {
    BrowserSync.init({
        server: config.destFolder
    });

    Gulp.watch(config.sourceFolder + '/scss/**', ['styles']);
    // Gulp.watch(config.sourceFolder + '/*.html', ['html', BrowserSync.reload]);
});
