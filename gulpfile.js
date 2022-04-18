const gulp = require('gulp');
const sass = require('./build/sass');
const scripts = require('./build/scripts');
const images = require('./build/images');
const sync = require('./build/browsersync');

[sass, scripts, images, sync].forEach(task => {
  task(gulp);
});

var jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";

gulp.task('build', gulp.series(['sass', 'scripts', 'images', 'jekyll']));
