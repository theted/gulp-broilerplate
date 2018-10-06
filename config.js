var pkg = require('./package.json')
var appName = 'gulp-broilerplate-'
var version = appName + pkg.version
var baseSrc = 'src/**/'

module.exports = {
  name: appName,
  version: version,
  environment: 'DEVELOPMENT',
  port: 5555,
  browserSyncPort: 5000,
  path: 'dist/',
  paths: {
    js: baseSrc + '*.js',
    stylus: baseSrc + '*.styl',
    views: baseSrc + '**.pug',
  },
  out: {
    css: version + '.css',
    js: version + '.js',
    jsMin: version + '-min.js'
  }
}
