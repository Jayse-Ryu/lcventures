var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    concat          = require('gulp-concat'),
    autoprefixer    = require('gulp-autoprefixer'),
    uglify          = require('gulp-uglify'),
    minifyjs        = require('gulp-js-minify'),
    browserSync     = require('browser-sync'),
    sourcemaps      = require('gulp-sourcemaps'),
    imagemin        = require('gulp-imagemin'),
    config = {
        bootstrapDir    : './bower_components/bootstrap-sass',
        bootstrapJs     : './bower_components/bootstrap/dist/js',
        jqueryJs        : './bower_components/jquery/dist',
        jqueryLazy      : './bower_components/jquery-lazy',
        datePicker      : './bower_components/bootstrap-datepicker/dist/js',
        publicDir       : './public'
    };


// Compile scss to css ++ Combine, Compress, Auto Prefix
gulp.task('sass_common', function () {
    gulp.src(['scss/**/common.scss'])
        .pipe(sass({
            includePaths: ['scss', config.bootstrapDir + '/assets/stylesheets']
        }))
        .pipe(autoprefixer({
            browsers: ['last 99 versions', 'safari 5', 'ie 8', 'ie 9'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('common.css'))
        .pipe(gulp.dest('dist/css'));

    gulp.src(['scss/**/util1.scss', 'scss/**/main.scss', 'scss/**/detail.scss'])
        .pipe(sass({
            includePaths: ['scss', config.bootstrapDir + '/assets/stylesheets']
        }))
        .pipe(autoprefixer({
            browsers: ['last 99 versions', 'safari 5', 'ie 8', 'ie 9'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'));

    gulp.src(['scss/**/util2.scss', 'scss/**/login.scss', 'scss/**/register.scss'])
        .pipe(sass({
            includePaths: ['scss', config.bootstrapDir + '/assets/stylesheets']
        }))
        .pipe(autoprefixer({
            browsers: ['last 99 versions', 'safari 5', 'ie 8', 'ie 9'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('sign.css'))
        .pipe(gulp.dest('dist/css'));
});


// Compile JavaScript ++ Concat, Uglify, Compress, Source Map
gulp.task('js_common', function () {

    gulp.src([
        'js/**/common.js',
        config.bootstrapJs + '/bootstrap.js',
        config.jqueryJs + '/jquery.js',
        config.jqueryLazy + 'jquery.lazy.js',
        config.datePicker + '/bootstrap-datepicker.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('common.js'))
        .pipe(uglify())
        .pipe(minifyjs())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));

    gulp.src([
        'js/**/main.js',
        'js/**/util1.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(minifyjs())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));

    gulp.src([
        'js/**/detail.js',
        'js/**/util2.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('detail.js'))
        .pipe(uglify())
        .pipe(minifyjs())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});


// Optimization Images
gulp.task('images_comp', function () {
    gulp.src('images/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 10}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/images'))
});


// Copy Font files to dist
gulp.task('fonts', function() {
    gulp.src('font/*')
        .pipe(gulp.dest('dist/font'))
});


// Copy Video files to dist
gulp.task('videos', function () {
    gulp.src('videos/*')
        .pipe(gulp.dest('dist/videos'))
});


// Linking browser sync to these directions
gulp.task('browser-sync', function() {
    browserSync.init(["dist/css/*.css", "dist/js/*.js", "dist/images/*", "*.html"], {

        server: {
            baseDir: "./"
        }
    });
});


// Default running gulp ++ Watch without Fonts, Videos
gulp.task('default', ['sass_common', 'js_common', 'images_comp', 'fonts', 'videos', 'browser-sync'], function () {
    gulp.watch("scss/**/*.scss", ['sass_common']);
    gulp.watch("js/**/*.js", ['js_common']);
    gulp.watch("images/*", ['images_comp']);
});