const gulp         = require('gulp');
const watch        = require('gulp-watch');
const sass         = require('gulp-sass');
const cleanCSS     = require('gulp-clean-css');
const sourcemaps   = require('gulp-sourcemaps');
const terser       = require('gulp-terser');
const del          = require('del');
const size         = require('gulp-size');
const fileinclude  = require('gulp-file-include');

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
  gulp.src(dir.appSrc + 'images/**/*')
    .pipe(gulp.dest(dir.appDst + 'images/'))
    .pipe(size({
      title: 'Size of images'
    }));
  done();
}

function copyFontsTask(done) {
  gulp.src(dir.appSrc + 'fonts/**/*')
    .pipe(gulp.dest(dir.appDst + 'fonts/'))
    .pipe(size({
      title: 'Size of fonts'
    }));
  done();
}

function scriptsCompileTask(done) {
  gulp.src(dir.appSrc + 'js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(dir.appDst + 'js/'))
    .pipe(size({
      title: 'Size of scrips'
    }));
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

function cleanTask(done) {
  del.sync([ dir.appDst ]);
  done();
}

function watchTask(done) {
  gulp.watch(dir.appSrc + 'css/**/*.scss' , gulp.series(cssCompileTask));
  gulp.watch(dir.appSrc + 'js/**/*.js' , gulp.series(scriptsCompileTask));
  gulp.watch(dir.appSrc + 'templates/**/*.html' , gulp.series(fileIncludeTask));
  done();
}

exports.clean = gulp.parallel(cleanTask);
exports.css = gulp.parallel(cssCompileTask);
exports.html = gulp.parallel(fileIncludeTask);
exports.js = gulp.parallel(scriptsCompileTask);
exports.assets = gulp.parallel(copyImagesTask,copyFontsTask);

exports.compile = gulp.parallel(copyImagesTask,copyFontsTask,cssCompileTask,fileIncludeTask,scriptsCompileTask);
exports.default = gulp.series(gulp.parallel(copyImagesTask,copyFontsTask,cssCompileTask,fileIncludeTask,scriptsCompileTask),watchTask);
