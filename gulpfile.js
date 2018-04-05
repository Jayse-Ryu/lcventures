var gulp            = require('gulp'),
    htmlImport      = require('gulp-html-import'),
    htmlmin         = require('gulp-htmlmin'),
    bower           = require('gulp-bower'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    minifyjs        = require('gulp-js-minify'),
    sourcemaps      = require('gulp-sourcemaps'),
    imagemin        = require('gulp-imagemin'),
    browserSync     = require('browser-sync').create(),
    config = {
        srcDir          : './',
        distDir         : './dist',
        publicDir       : './public',
        bowerDir        : './bower_components',
        jqueryJs        : './bower_components/jquery/dist',
        jqueryLazy      : './bower_components/jquery-lazy',
        bootstrapDir    : './bower_components/bootstrap-sass',
        bootstrapJs     : './bower_components/bootstrap/dist/js',
        datePicker      : './bower_components/bootstrap-datepicker/dist/js'
    };


// Keep bower
gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});


// Compress and Import html
gulp.task('html_import', function () {
    gulp.src('index.html')
        .pipe(htmlImport('./html/'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));

    gulp.src('./html/page_1_company.html')
        .pipe(htmlImport('./html/'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(concat('page_1.html'))
        .pipe(gulp.dest('dist/html'));

    gulp.src('./html/page_2_project.html')
        .pipe(htmlImport('./html/'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(concat('page_2.html'))
        .pipe(gulp.dest('dist/html'));

    gulp.src('./html/page_3_news.html')
        .pipe(htmlImport('./html/'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(concat('page_3.html'))
        .pipe(gulp.dest('dist/html'));

    gulp.src('./html/page_4_people.html')
        .pipe(htmlImport('./html/'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(concat('page_4.html'))
        .pipe(gulp.dest('dist/html'));

    gulp.src('./html/page_5_location.html')
        .pipe(htmlImport('./html/'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(concat('page_5.html'))
        .pipe(gulp.dest('dist/html'));

    gulp.src('./html/page_6_contact.html')
        .pipe(htmlImport('./html/'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(concat('page_6.html'))
        .pipe(gulp.dest('dist/html'));

    gulp.src('./html/page_7_recruit.html')
        .pipe(htmlImport('./html/'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(concat('page_7.html'))
        .pipe(gulp.dest('dist/html'));

    gulp.src('./html/page_8_consult.html')
        .pipe(htmlImport('./html/'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(concat('page_8.html'))
        .pipe(gulp.dest('dist/html'));
});


// Font files to dist
gulp.task('fonts', function () {
    return gulp.src([
        config.bowerDir + '/bootstrap-sass/assets/fonts/**/*',
        config.bowerDir + '/noto-sans-kr/fonts/**/*'
    ])
        .pipe(gulp.dest(config.distDir + '/fonts'));
});


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

    gulp.src([
        "scss/**/util1.scss",
        "scss/**/main.scss",
        "scss/**/detail.scss",
        "scss/**/page_1.scss",
        "scss/**/page_2.scss",
        "scss/**/page_3.scss",
        "scss/**/page_4.scss",
        "scss/**/page_5.scss",
        "scss/**/page_6.scss",
        "scss/**/page_7.scss",
        "scss/**/page_8.scss"
    ])
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
        config.srcDir + 'js/**/common.js',
        config.jqueryJs + 'jquery.js',
        //config.jqueryLazy + 'jquery.lazy.js',
        config.bootstrapJs + '/index.js',
        //config.datePicker + '/bootstrap-datepicker.js'
        //config.bowerDir + '/jquery-validation/dist/jquery.validate.js',
        //config.bowerDir + '/jquery-validation/dist/additional-methods.js'
        //config.bowerDir + '/owl.carousel/dist/owl.carousel.min.js'
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
        .pipe(gulp.dest('dist/images'));
});


// Copy Video files to dist
gulp.task('videos', function () {
    gulp.src('videos/*')
        .pipe(gulp.dest('dist/videos'))
});


// Linking browser sync to these directions
gulp.task('browser-sync', function() {
    browserSync.init(["dist/css/*.css", "dist/js/*.js", "dist/images/*", "dist/html/*.html"], {
        server: {
            //baseDir: "./"
            baseDir: config.distDir
        }
    });
});


// Default running gulp ++ Watch without Fonts, Videos
gulp.task ('default',
    [
        'fonts',
        'html_import',
        'sass_common',
        'js_common',
        'images_comp',
        'videos',
        'browser-sync'
    ],
    function () {
        gulp.watch("*.html", ['html_import']);
        gulp.watch("html/*.html", ['html_import']);
        gulp.watch("scss/**/*.scss", ['sass_common']);
        gulp.watch("js/**/*.js", ['js_common']);
        gulp.watch("images/*", ['images_comp']);
    }
);