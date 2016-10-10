var Gulp = require('gulp');
var Autoprefixer = require('gulp-autoprefixer');
var BrowserSync = require('browser-sync').create();
var Sass = require('gulp-sass');
var Clean = require('gulp-clean');

const config = {
    destFolder: './dist',
    sourceFolder: './src'
};

Gulp.task('browser-sync', ['styles', 'html'], () =>
    BrowserSync.init({
        server: config.destFolder
    })
);

Gulp.task('browsersync-reload', () =>
    BrowserSync.reload()
);

Gulp.task('styles', () =>
    Gulp.src(config.sourceFolder + '/scss/circle.scss')
        .pipe(Sass()).on('error', Sass.logError)
        .pipe(Autoprefixer())
        .pipe(Gulp.dest(config.destFolder))
        .pipe(BrowserSync.stream({match: '**/*.css'}))
);

Gulp.task('html', ['clean', 'styles'], () =>
    Gulp.src(config.sourceFolder + '/index.html')
        .pipe(Gulp.dest(config.destFolder))
);

Gulp.task('clean', () =>
    Gulp.src(config.destFolder, {read: false})
        .pipe(Clean())
);

Gulp.task('default', ['clean', 'styles', 'html']);

Gulp.task('watch', ['clean', 'styles', 'html', 'browser-sync'], () => {
    Gulp.watch(config.sourceFolder + '/scss/**', ['styles']);
    Gulp.watch(config.sourceFolder + '/**/*.html', ['html', 'browsersync-reload']);
});
