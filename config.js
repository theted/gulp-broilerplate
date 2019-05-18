const pkg = require('./package.json')
const appName = 'gulp-broilerplate-'
const version = appName + pkg.version

const baseSrc = 'src/'
module.exports = {
  name: appName,
  version: version,
  environment: 'DEVELOPMENT',
  port: 5555,
  browserSyncPort: 5000,
  path: 'dist/',
  bsFiles: 'dist/**/*.*',
  pugConfig: {
    compileDebug: true,
    pretty: true,
    verbose: true
  },
  bsConfig: {
    server: {
      baseDir: './dist/'
    },
    files: [
      './dist/' + version + '.css',
      './dist/' + version + '.js',
      './dist/**/*.html'
    ]
  },
  paths: {
    js: baseSrc + '*.js',
    style: baseSrc + '*.styl',
    views: baseSrc + '**.pug'
  },
  out: {
    css: version + '.css',
    js: version + '.js',
    jsMin: version + '-min.js'
  }
}
