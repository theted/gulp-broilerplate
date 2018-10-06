var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
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

gulp.task('browser-sync', function() {
  browserSync({
    files: config.bsFiles,
    port: config.browserSyncPort,
    proxy: 'localhost:' + config.port,
    browser: [],
  });
});

gulp.task('default', [
  'browser-sync'
]);

gulp.task('watch', ['default'], function () {
  gulp.watch(config.paths.stylus, ['build-stylus']);
});
