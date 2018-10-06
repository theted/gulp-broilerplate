var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var pug = require('gulp-pug')
var browserSync = require('browser-sync');
var pkg = require('./package.json');
var config = require('./config');

gulp.task('build-stylus', function() {
  gulp.src(config.paths.stylus)
    .pipe(stylus({
      'include css': true
    }))
    .pipe(concat(config.out.css))
    .on('error', console.error.bind(console)) // swallow errors, so that simple syntax errors does not chrash the whole Gulp watch task
    .pipe(gulp.dest(config.path));
});

gulp.task('build-views', function buildHTML() {
  return gulp.src('src/*.pug').pipe(pug({
    compileDebug: true,
    pretty: true,
    verbose: true,
    data: {
      version: config.version,
    }
  })).pipe(gulp.dest(config.path))
})

gulp.task('browser-sync', function() {
  browserSync({
    files: config.bsFiles,
    port: config.browserSyncPort,
    server: './dist',
    browser: [],
  });
});

gulp.task('default', [
  'browser-sync'
]);

gulp.task('watch', ['default'], function () {
  gulp.watch(config.paths.stylus, ['build-stylus']);
  gulp.watch(config.paths.views, ['build-views']);
});
