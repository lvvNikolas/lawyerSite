const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass =  require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');



// const imagemin = require('gulp-imagemin');

function browsersync(){
    browserSync.init({
        server:{baseDir: 'app/'},
        notify: false,
        online: true
    })
}


function scripts() {
    return src([
        // 'node_modules/jquery/dist/jquery.min.js',
        'app/scripts/app.js',
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/scripts/'))
    .pipe( browserSync.stream())
}

function styles(){
    return src('app/sass/main.scss' )
    .pipe(sass())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], gred: true}))
    .pipe(cleancss(({level:{1: {specialComments: 0}}, format: 'beautify'})))
    .pipe(dest('app/css/'))
    .pipe( browserSync.stream())

}

// function images(){
//     return src('app/images/src/**/*')
//     .pipe(imagemin())
//     .pipe(dest('app/images/dest'))
// }


function buildcopy(){
    return src([
        'app/css/**/*.min.css', 
        'app/scripts/**/*.min.js',
        'app/images/dest/**/*',
        'app/**/*.html',
    ], {base: 'app'})
    .pipe(dest('dist'))
}

function startwatch(){
    watch('app/**/*.scss',styles);
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch('app/**/*.html').on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.build = series(styles, scripts,  buildcopy)
// exports.images = images;

exports.default = parallel(scripts, styles, browsersync, startwatch);