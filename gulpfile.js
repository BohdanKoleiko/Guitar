const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass')(require('sass'));
const rename       = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const htmlmin      = require('gulp-htmlmin');
const imagemin     = require('gulp-imagemin');

// Static server
gulp.task('server', function() {
    browserSync.init({
      open: false,
      server: {
          baseDir: './build',
      }
    });
});

//Compress, add min prefix to css file, add autoprefix then clean css, put its in css folder and reload browsersync plugin
gulp.task('styles', function() {
  return gulp.src('./src/sass/**/*.+(scss|sass)')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({
      prefix: '',
      suffix: '.min',
    }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

//Wath for changes of sass/scss files and html
gulp.task('watch', function() {
  gulp.watch('./src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
  gulp.watch('./src/*.html').on('change', browserSync.reload);
  gulp.watch('./src/*.html').on('change', gulp.parallel('html'));
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./build'));
});

gulp.task('scrits', function () {
  return gulp.src('src/**/*.js')
    .pipe(gulp.dest('./build/'));
});

gulp.task('fonts', function () {
  return gulp.src('src/font/**/*')
    .pipe(gulp.dest('./build/font'));
});

gulp.task('img', function () {
  return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img'));
});


//To run all tasks with only one command "gulp"
gulp.task('default', gulp.parallel('server', 'styles', 'watch', 'html', 'scrits', 'fonts', 'img'));