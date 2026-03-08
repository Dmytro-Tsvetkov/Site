'use strict';

const path      = require('path');
const { src, dest, watch, series } = require('gulp');
const sass      = require('sass');
const postcss   = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const { Transform } = require('stream');

const SCSS_SRC  = 'assets/scss/*.scss';
const CSS_DEST  = 'assets/css';
const WATCH_SRC = 'assets/scss/**/*.scss';

function compileSass(compressed) {
  return new Transform({
    objectMode: true,
    transform(file, _enc, callback) {
      if (file.isNull()) return callback(null, file);
      try {
        const result = sass.compile(file.path, {
          style: compressed ? 'compressed' : 'expanded',
          sourceMap: !compressed,
        });
        file.contents = Buffer.from(result.css);
        file.path = path.join(path.dirname(file.path), path.basename(file.path, '.scss') + '.css');
        callback(null, file);
      } catch (err) {
        callback(err);
      }
    },
  });
}

function styles() {
  return src(SCSS_SRC)
    .pipe(compileSass(false))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(CSS_DEST));
}

function stylesBuild() {
  return src(SCSS_SRC)
    .pipe(compileSass(true))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(CSS_DEST));
}

function watchFiles() {
  watch(WATCH_SRC, styles);
}

exports.default = series(styles, watchFiles);
exports.watch   = series(styles, watchFiles);
exports.build   = stylesBuild;
exports.styles  = styles;
