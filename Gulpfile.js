var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var stylus = require('gulp-stylus')
var pug = require('gulp-pug')
var browserSync = require('browser-sync')
var pkg = require('./package.json')
var config = require('./config')

gulp.task('build-stylus', function () {
  gulp.src(config.paths.stylus)
    .pipe(stylus({
      'include css': true
    }))
    .pipe(concat(config.out.css))
    .on('error', console.error.bind(console)) // swallow errors, so that simple syntax errors does not chrash the whole Gulp watch task
    .pipe(gulp.dest(config.path))
})

gulp.task('build-views', function buildHTML() {
  return gulp.src('src/*.pug').pipe(pug({
    compileDebug: true,
    pretty: true,
    verbose: true,
    data: {
      version: config.version
    }
  })).pipe(gulp.dest(config.path))
})

// build js - uglified/minified for production
gulp.task('build-js', function () {
  gulp.src(config.paths.js)
    .pipe(concat(config.out.jsMin))
    .pipe(uglify())
    .pipe(gulp.dest(config.path))
})

// build js - simple concatination for development
gulp.task('build-js-dev', function () {
  gulp.src(config.paths.js)
    .pipe(concat(config.out.js))
    .pipe(gulp.dest(config.path))
})

gulp.task('browser-sync', function () {
  browserSync({
    files: config.bsFiles,
    port: config.browserSyncPort,
    server: config.path,
    browser: []
  })
})

gulp.task('default', [
  'browser-sync'
])

gulp.task('watch', ['default'], function () {
  gulp.watch(config.paths.stylus, ['build-stylus'])
  gulp.watch(config.paths.views, ['build-views'])
  gulp.watch(config.paths.js, ['build-js-dev']) // no need to build minified version in development
})
