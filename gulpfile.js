'use strict';

const path      = require('path');
const { src, dest, watch, series } = require('gulp');
const sass      = require('sass');
const postcss   = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const { Transform } = require('stream');

const SCSS_SRC  = 'assets/scss/main.scss';
const CSS_DEST  = 'assets/css';
const WATCH_SRC = 'assets/scss/**/*.scss';

// Compile SCSS using the modern Dart Sass API (no legacy warnings)
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
        // Force output filename to style.css regardless of entry point name
        file.path = path.join(path.dirname(file.path), 'style.css');
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
