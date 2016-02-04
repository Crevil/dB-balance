var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var bower = require('gulp-bower');
var debug = require('gulp-debug');
var mainBowerFiles = require('main-bower-files');
var del = require('del');

var paths = {
    // source files
    html: ['src/**/*.html'],
    css: ['src/**/*.css'],
    ts: ['src/**/*.ts'],
    
    // compiled files
    js: 'compiledApp',
    
    // others
    assets: ['src/assets/**/*.*'],
    api: ['src/api/**/*.json'],
    bowerComponents: 'bower_components',
    
    // destination names
    dest: {
        dest: 'dest/',
        vendors: 'vendors.min.js',
        app: 'app.min.js',
        css: 'site.min.css',
        maps: 'maps/',
        assets: 'assets/',
        api: 'api/',
        fonts: 'fonts/'
    }
};

gulp.task('typescript', function () {
    return gulp.src(paths.ts)
        .pipe(ts({
            module: 'commonjs',
            removeComments: true
        }))
        .js
        .pipe(gulp.dest(paths.js));
});

gulp.task("clean-scripts", function () {
    return del([
        paths.js,
        paths.dest.dest + paths.dest.app,
        paths.dest.dest + paths.dest.vendors,
        paths.dest.dest + paths.dest.maps
    ]);
});

gulp.task("vendor-bundle", ["clean-scripts", "bower-restore"], function () {
    return gulp.src(mainBowerFiles(
        {
            filter: '**/*.js',
            // fix angular dependency to load jquery first
            overrides: {
                "angular": {
                    "dependencies": {
                        "jquery": "2.1.x"
                    }
                }
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(concat(paths.dest.vendors))
        .pipe(uglify())
        .pipe(sourcemaps.write(paths.dest.maps))
        .pipe(gulp.dest(paths.dest.dest));
});

gulp.task("app-bundle", ["clean-scripts", "typescript"], function () {
    return gulp.src(
        [
            paths.js + "/app.module.js",
            paths.js + "/**/*.module.js",
            paths.js + "/**/*.js"
        ]
        )
        .pipe(sourcemaps.init())
        .pipe(concat(paths.dest.app))
        .pipe(uglify())
        .pipe(sourcemaps.write(paths.dest.maps))
        .pipe(gulp.dest(paths.dest.dest));
});

gulp.task("clean-styles", function () {
    return del([
        paths.dest.dest + paths.dest.css,
        paths.dest.dest + paths.dest.maps,
        paths.dest.dest + paths.dest.assets
    ]);
});

gulp.task("assets", ["clean-styles", "bower-restore"], function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(paths.dest.dest + paths.dest.assets));
});

gulp.task("fonts", function () {
    return gulp.src(mainBowerFiles({ filter: '**/fonts/*.*' }))
        .pipe(gulp.dest(paths.dest.dest + paths.dest.fonts));
});

gulp.task("api", function () {
    return gulp.src(paths.api)
        .pipe(gulp.dest(paths.dest.dest + paths.dest.api));
});

gulp.task("html", function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dest.dest));
});

gulp.task("css", ["clean-styles", "bower-restore"], function () {
    return gulp.src(mainBowerFiles({ filter: '**/*.css' }).concat(paths.css))
        .pipe(sourcemaps.init())
        .pipe(concat(paths.dest.css))
        .pipe(cssnano())
        .pipe(sourcemaps.write(paths.dest.maps))
        .pipe(gulp.dest(paths.dest.dest));
});

gulp.task("bower-restore", function () {
    return bower({ path: paths.bowerComponents, verbosity: 1 });
});

gulp.task("styles", ["css", "assets"]);

gulp.task("content", ["html", "api"]);

gulp.task("scripts", ["vendor-bundle", "app-bundle"]);

gulp.task("clean", ["clean-scripts", "clean-styles"]);

gulp.task("deploy", ["scripts", "styles", "content"]);

gulp.task('watch', function () {
    gulp.watch('./src/**/*.ts', ['scripts']);
    gulp.watch('./src/**/*.css', ['styles']);
    gulp.watch(['./src/**/*.html', './src/api/*'], ['content']);
    gulp.watch('./bower.json', ['deploy']);
});
