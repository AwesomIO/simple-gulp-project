var gulp = require('gulp'),
	_include = require('gulp-file-include');

var path = {
	src : {
		html : 'src/*.html'
	},
	public : {
		html : 'public/'
	}
};

gulp.task('html-build', function() {
  gulp.src(path.src.html)
    .pipe(_include({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(path.public.html));
});