var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	_include = require('gulp-file-include');

var path = {
	src : {
		html : 'src/*.html'
	},
	public : {
		html : 'public/'
	}
};

var serverConfig = {
    server: {
		baseDir: "./public/",
		index: "index.html"
    },
    tunnel: true,
    host: 'localhost',
    port: 3000,
	logLevel: "debug",
    logPrefix: "Simple Gulp Project",
	online: false,
	browser: 'firefox'
};

gulp.task('html-build', function() {
  gulp.src(path.src.html)
    .pipe(_include({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(path.public.html));
});

gulp.task('server-start', function () {
    browserSync(serverConfig);
});