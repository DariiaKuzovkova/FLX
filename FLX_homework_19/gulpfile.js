const {src, dest, task, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

let serverTask = () => {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  })
};

let htmlTask = () => {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
    .pipe(browserSync.reload({stream: true}))
}

let jsTask = () => {
  return src('src/js/*.js')
      .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('./dist/js/'));
}

let sassTask = () => {
  return src('src/sass/*.scss')
  .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/css/'));
}

let imgMin = () => {
  return src('src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img/'))
};

task('default', series(htmlTask, sassTask, jsTask, imgMin));

exports.serve = () => {
  serverTask();
  watch('./src/*.html', htmlTask);
  watch('./src/sass/*.scss', sassTask);
  watch('./src/js/*.js', jsTask);
}