var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	ts = require('gulp-typescript'),
	del = require('del');

var paths = {
	html: ['src/**/*.html'],
	css: ['src/**/*.css'],
	ts: ['src/**/*.ts'],
	js : ['src/components/**/*.js'],
	assets: ['src/assets/**/*.*'],
	other: ['src/api/**/*.json'],
	dest: 'dest/'
};

gulp.task('typescript', function() {
	return gulp.src(paths.ts)
		.pipe(ts({
			module: 'commonjs',
			removeComments: true
		}))
		.js
		.pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
	gulp.watch('./src/**/*.*', ['deploy']);
});

gulp.task('deploy', ['clean', 'typescript'], function() {
	return gulp.src(paths.html
				.concat(paths.js)
				.concat(paths.css)
				.concat(paths.assets)
				.concat(paths.other), {base: './src'})
		.pipe(gulp.dest(paths.dest));
});

gulp.task('clean', function() {
	del(paths.dest);
});

gulp.task('default', ['deploy'])
