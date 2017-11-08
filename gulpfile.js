var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	watch = require('gulp-watch'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	babel = require('gulp-babel'),
	del = require('delete'),
	imagemin = require('gulp-imagemin'),
	_include = require('gulp-file-include');

var path = {
	src : {
		html : 'src/*.html',
		scss : 'src/scss/*.scss',
		js : 'src/js/main.js',
		img : 'src/images/*'
	},
	public : {
		html : 'public/',
		css : 'public/css/',
		js : 'public/js/',
		img : 'public/images/'
	},
	watch : {
		html : 'src/**/*.html',
		scss : 'src/scss/**/*.scss',
		js : 'src/js/**/*.js',
		img : 'src/images/*'
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
	browser: 'firefox',
	codeSync: true
};

gulp.task('html-build', function() {
  gulp.src(path.src.html)
    .pipe(_include({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(path.public.html))
	.pipe(browserSync.stream());
});

gulp.task('css-build', function() {
  gulp.src(path.src.scss)
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(gulp.dest(path.public.css))
	.pipe(rename({ suffix: '.min' }))
	.pipe(cleanCSS())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(path.public.css))
	.pipe(browserSync.stream());
});

gulp.task('js-build', function() {
  gulp.src(path.src.js)
	.pipe(sourcemaps.init())
	.pipe(_include({
      prefix: '@@',
      basepath: '@file'
    }))
	.pipe(babel({
		presets: ['env']
	}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(path.public.js))
	.pipe(browserSync.stream());
});

gulp.task('images-build', function() {
	gulp.src(path.src.img)
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest(path.public.img))
		.pipe(browserSync.stream());
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html-build');
    });
    watch([path.watch.scss], function(event, cb) {
        gulp.start('css-build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js-build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('images-build');
    });
});

gulp.task('server-start', function () {
    browserSync(serverConfig);
});

gulp.task('clean', function(){
	del('public/', {force: true});
});

gulp.task('build', ['clean', 'html-build', 'css-build', 'js-build', 'images-build']);

gulp.task('default', ['build', 'server-start', 'watch']);