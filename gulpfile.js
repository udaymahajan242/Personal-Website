const gulp = require('gulp');
const sass = require('./build/sass');
const scripts = require('./build/scripts');
const images = require('./build/images');
const sync = require('./build/browsersync');
const spawn = require('cross-spawn');


[sass, scripts, images, sync].forEach(task => {
  task(gulp);
});

gulp.task('build', gulp.series(['sass', 'scripts', 'images']));
gulp.task('jekyll', function (){
  spawn('jekyll', ['build'], {stdio: 'inherit'});
});