const gulp         = require('gulp');
const watch        = require('gulp-watch');
const sass         = require('gulp-sass');
const cleanCSS     = require('gulp-clean-css');
const sourcemaps   = require('gulp-sourcemaps');
const del          = require('del');
const rename       = require('gulp-rename');
const size         = require('gulp-size');
const fileinclude  = require('gulp-file-include');

/*********************
  Directories
*********************/
const dir = {
  appDst: './assets/dist/',
  appSrc: './assets/src/'
};

/*********************
  CSS
*********************/

/* compile scss (SRC -> SRC) */
function cssCompileTask(done) {
  gulp.src(dir.appSrc + 'css/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cleanCSS({
      keepSpecialComments : 0
    }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(dir.appSrc + 'css/'))
    .pipe(size({
      title: 'Size of CSS'
    }));
  done();
}
// gulp.task('css-compile', gulp.series((done) => {  
//   gulp.src(dir.appSrc + 'css/main.scss')
//     .pipe(sass())
//     .pipe(gulp.dest(dir.appSrc + 'css/'));
//   done();
// }));


/* compile scss (SRC -> DIST) */
// gulp.task('css-dist', gulp.series((done) => {  
//   gulp.src(dir.appSrc + 'css/main.scss')
//     .pipe(sass())
//     .pipe(sourcemaps.init())
//     .pipe(cleanCSS({
//       keepSpecialComments : 0
//     }))
//     .pipe(sourcemaps.write())
//     .pipe(rename('main.min.css'))
//     .pipe(gulp.dest(dir.appDst + 'css/'))
//     .pipe(size({
//       title: 'Size of CSS'
//     }));
//   done();
// }));



/* clean ....... */
function cleanTask(done) {
  del.sync([ dir.appDst ]);
  del.sync([ dir.appSrc + 'html' ]);
  del.sync([ dir.appSrc + 'css/main.css' ]);
  done();
}

// gulp.task('clean', (done) => {
//   del.sync([ dir.appDst ]);
//   done();
// });

/* DEFAULT - watch all changes (SRC) */
// gulp.task('default', gulp.series('cssCompileTask', (done) => {
  // browserSync.init({
  //   server: {
  //     baseDir: dir.appSrc
  //   }
  // });

//  gulp.watch(dir.appSrc + 'css/**/*.scss' , gulp.series('cssCompileTask'));
  // gulp.watch(dir.appSrc + 'templates/*.html' , gulp.series('fileinclude'));
  // gulp.watch(dir.appSrc + 'templates/**/*.html' , gulp.series('fileinclude'));
  // gulp.watch(dir.appSrc + 'templates/*.html').on('change', browserSync.reload);
  // gulp.watch(dir.appSrc + 'templates/**/*.html').on('change', browserSync.reload);
  // gulp.watch(dir.appSrc + 'css/*.css').on('change', browserSync.reload);
//  done();
//}));

/*********************
  Fileinclude
*********************/

function fileIncludeTask(done) {
  gulp.src([dir.appSrc + 'templates/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(dir.appSrc + 'html'))
    .pipe(size({
      title: 'Size of HTML'
    }));
  done();
}


exports.html = gulp.series(fileIncludeTask)
exports.clean = gulp.series(cleanTask);
exports.compile = gulp.series(cssCompileTask,fileIncludeTask);
