const { watch, src, dest, parallel, series } = require('gulp')
const browserSync = require('browser-sync').create()
const config = require('./config')
const pug = require('gulp-pug')
const stylus = require('gulp-stylus')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const data = { version: config.version }
config.pugConfig.data = data

// compile pug -> HTML
const html = () => src(config.paths.views)
  .pipe(pug(config.pugConfig))
  .pipe(dest('dist'))

// compile stylus -> HTML
const css = () => src(config.paths.style)
  .pipe(stylus({ 'include css': true }))
  .pipe(concat(config.out.css))
  .pipe(dest('dist'))

// concatinate & minify JS
const js = () => src(config.paths.js)
  .pipe(concat(config.out.js))
  .pipe(uglify())
  .pipe(dest('dist'))

// watch files; compile on file event changes
const watchFiles = () => {
  watch(config.paths.style, css)
  watch(config.paths.views, html)
  watch(config.paths.js, js)
}

// setup browserSync; auto-reload compiled assets in open browser
const bs = () => browserSync.init(config.bsConfig)

// setup global build script; build all resources
const build = parallel(html, css, js)
const defaultTask = parallel(build, bs, watchFiles)

module.exports = { build, bs, js, css, html, watch: watchFiles, default: defaultTask }
