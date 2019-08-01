const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
// CSS
var bootstrap = 'node_modules/bootstrap/scss/bootstrap.scss';
var style_css = 'app/scss/**/*.scss';
var fontawesome = 'node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss';
var all_css = 'node_modules/@fortawesome/fontawesome-free/css/all.css'
// JS
var bootstrap_min_js = 'node_modules/bootstrap/dist/js/bootstrap.min.js';
var jquery_min_js = 'node_modules/jquery/dist/jquery.min.js';
var fontawesome_min_js = 'node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js';
var all_js = 'node_modules/@fortawesome/fontawesome-free/js/all.js';
var my_script = 'app/js/*.js'
// webfonts
var webfonts = 'node_modules/@fortawesome/fontawesome-free/webfonts/*';
// compile scss
function scss() {
    return gulp
        .src([bootstrap, style_css, fontawesome, all_css])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
}
function copyWebfonts() {
    return gulp
        .src([webfonts])
        .pipe(gulp.dest('app/webfonts'));
}
// compile js
function scripts() {
    return gulp
        .src([bootstrap_min_js, jquery_min_js, fontawesome_min_js, all_js, my_script])
        .pipe(gulp.dest('app/js'))
}
// browser reload
function browserSyncReload() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    });
    gulp.watch('app/scss/**/*.scss', scss);
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
    gulp.watch('app/*.html').on('change', browserSync.reload);
}

exports.scss = scss;
exports.scripts = scripts;
exports.copyWebfonts = copyWebfonts;
exports.browserSync = browserSync;

gulp.task('scss', gulp.series(scss));
gulp.task('scripts', gulp.series(scripts));
gulp.task('copyWebfonts', gulp.series(copyWebfonts));
gulp.task('reload', gulp.series(browserSyncReload));
gulp.task('default', gulp.series(scss, scripts, copyWebfonts, browserSyncReload));
//------------------------------------------//
//npm i bootstrap --save-dev