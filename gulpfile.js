var gulp                = require("gulp"),
    browserSync         = require("browser-sync").create(),
    sass                = require("gulp-sass"),
    sourcemaps          = require("gulp-sourcemaps"),
    gulpSequence        = require("gulp-sequence"),
    concat 				= require('gulp-concat'),
    // babel               = require('gulp-babel'),
    minify              = require('gulp-minify');

// PATHS SRC
var paths = {
    ejs: {
        input:      "site/**/*.ejs"
    },
    sass: {
        input:      "site/public/scss/**/*.scss",
        output:     "site/public/css",
    },

    js: {
        input: "site/public/js/app/**/*.js",
        output: "site/public/js",
        framework: "site/public/js/app/",
    },

    server: {
        input:      ["site/**/*.ejs", "site/**/*.js", "site/**/*.scss"]
    },
};

gulp.task("serve", ["sass"], function() {
    browserSync.init({
        server: {
            baseDir: "site/"
        }
    });

    gulp.watch(paths.sass.input, ["sass"]); 

    gulp.watch(paths.js.input, ["js"]);    
    gulp.watch([paths.ejs.input, "./site/**/*.js"]).on("change", browserSync.reload);
});


// CSS
gulp.task("sass", function() {
    return gulp.src(paths.sass.input)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.sass.output))
        .pipe(browserSync.stream());
});

gulp.task("js", function () {

    // return gulp.src(
    //     [
    //         paths.js.framework + 'polyfill/es6.js',
    //         paths.js.framework + 'models/Promotion.js',
    //         paths.js.framework + 'controllers/PromotionController.js',
    //         paths.js.framework + 'models/ListPromotion.js',
    //         paths.js.framework + 'views/View.js',
    //         paths.js.framework + 'views/PromotionsView.js',
    //         paths.js.framework + 'services/ProxyFactory.js',
    //         paths.js.framework + 'helpers/Bind.js',
    //         paths.js.framework + 'services/PromotionService.js',
    //         paths.js.framework + 'services/HttpService.js',
    //         paths.js.framework + 'app.js',
    //     ])
    //     .pipe(babel({
    //         presets: ['env'],
    //     }))
    //     .pipe(concat('bundle.js'))
    //     .pipe(minify())
    //     .pipe(gulp.dest(paths.js.output))
    //     .pipe(browserSync.stream());
});

gulp.task("default", gulpSequence(["sass", "js", "serve"]));