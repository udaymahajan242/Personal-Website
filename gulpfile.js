const gulp = require('gulp');
const sass = require('./build/sass');
const scripts = require('./build/scripts');
const images = require('./build/images');
const sync = require('./build/browsersync');
var exec = require('child_process').exec;
var gutil = require('gulp-util');
[sass, scripts, images, sync].forEach(task => {
  task(gulp);
});

gulp.task('build', gulp.series(['sass', 'scripts', 'images']));


gulp.task('jekyll', function (){
exec('jekyll build', function(err, stdout, stderr) {
    console.log(stdout);
});
});
