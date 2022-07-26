const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass')(require('sass'));
const rename       = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});

//Compress, add min prefix to css file, add autoprefix then clean css, put its in css folder and reload browsersync plugin
gulp.task('styles', function() {
  return gulp.src("./src/sass/**/*.+(scss|sass)")
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({
      prefix: "",
      suffix: ".min",
    }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest("./src/css"))
    .pipe(browserSync.stream());
});

//Wath for changes of sass files and html
gulp.task('watch', function() {
  gulp.watch('./src/sass/**/*.+(scss|sass)', gulp.parallel("styles"));
  gulp.watch('./src/*.html').on('change', browserSync.reload);
});

//To run all tasks with only one command "gulp"
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));