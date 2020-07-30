const gulp         = require('gulp');
const watch        = require('gulp-watch');
const sass         = require('gulp-sass');
const cleanCSS     = require('gulp-clean-css');
const sourcemaps   = require('gulp-sourcemaps');
const del          = require('del');
const size         = require('gulp-size');
const fileinclude  = require('gulp-file-include');

/*********************
  Directories
*********************/
const dir = {
  appDst: './assets/dist/',
  appSrc: './assets/src/'
};

function cssCompileTask(done) {
  gulp.src(dir.appSrc + 'css/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({
      keepSpecialComments : 0
    }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(dir.appDst + 'css/'))
    .pipe(size({
      title: 'Size of CSS'
    }));
  done();
}

function copyImagesTask(done) {
  gulp.src([
    dir.appSrc + 'images/*',
    dir.appSrc + 'images/*/*'
  ])
    .pipe(gulp.dest(dir.appDst + 'images/'))
    .pipe(size({
      title: 'Size of images'
    }));
  done();
}

function copyFontsTask(done) {
  gulp.src([
    dir.appSrc + 'fonts/*',
    dir.appSrc + 'fonts/*/*'
  ])
    .pipe(gulp.dest(dir.appDst + 'fonts/'))
    .pipe(size({
      title: 'Size of fonts'
    }));
  done();
}


function cleanTask(done) {
  del.sync([ dir.appDst ]);
  del.sync([ dir.appSrc + 'html' ]);
  del.sync([ dir.appSrc + 'css/main.css' ]);
  done();
}

function watchTask(done) {
  gulp.watch(dir.appSrc + 'css/**/*.scss' , gulp.series('css'));
  gulp.watch(dir.appSrc + 'templates/**/*.html' , gulp.series('html'));
  done();
}

function fileIncludeTask(done) {
  gulp.src([dir.appSrc + 'templates/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(dir.appDst + 'html'))
    .pipe(size({
      title: 'Size of HTML'
    }));
  done();
}

exports.clean = gulp.series(cleanTask);
exports.css = gulp.series(cssCompileTask);
exports.html = gulp.series(fileIncludeTask);
exports.assets = gulp.series(copyImagesTask,copyFontsTask);

exports.compile = gulp.series(copyImagesTask,copyFontsTask,cssCompileTask,fileIncludeTask);
exports.default = gulp.series(copyImagesTask,copyFontsTask,cssCompileTask,fileIncludeTask,watchTask);
