var argv = require('minimist')(process.argv.slice(2));
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var flatten = require('gulp-flatten');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var lazypipe = require('lazypipe');
var less = require('gulp-less');
var merge = require('merge-stream');
var minifyCss = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var uglify = require('gulp-uglify');

var manifest = require('asset-builder')('./manifest.json');

var path = manifest.paths;
var globs = manifest.globs;
var project = manifest.getProjectGlobs();

// Path to the compiled assets manifest in the dist directory
var revManifest = path.dist + 'assets.json';

var config = manifest.config || {};

// CLI options
var enabled = {
    // Enable static asset revisioning when `--production`
    rev: argv.production,
    // Disable source maps when `--production`
    maps: !argv.production,
    // Disable minifaction when `--production`
    minimize: argv.production,
    // Fail styles task on error when `--production`
    failStyleTask: argv.production,
    // Fail due to JSHint warnings only when `--production`
    failJSHint: argv.production,
    // Fail due to TSLint warnings only when `--production`
    failTSLint: argv.production,
    // Strip debug statments from javascript when `--production`
    stripJSDebug: argv.production
};

// ### CSS processing pipeline
// Example
// ```
// gulp.src(cssFiles)
//   .pipe(cssTasks('main.css')
//   .pipe(gulp.dest(path.dist + 'styles'))
// ```
var cssTasks = function(filename) {
    return lazypipe()
        .pipe(function() {
            return gulpif(!enabled.failStyleTask, plumber());
        })
        .pipe(function() {
            return gulpif(enabled.maps, sourcemaps.init());
        })
        .pipe(function() {
            return gulpif('*.less', less());
        })
        .pipe(function() {
            return gulpif('*.scss', sass({
                outputStyle: 'nested', // libsass doesn't support expanded yet
                precision: 10,
                includePaths: ['.'],
                errLogToConsole: !enabled.failStyleTask
            }));
        })
        .pipe(concat, filename)
        .pipe(autoprefixer, {
            browsers: [
                'last 2 versions',
                'android 4',
                'opera 12'
            ]
        })
        .pipe(function() {
            return gulpif(enabled.minimize, minifyCss({
                advanced: false,
                rebase: false
            }));
        })
        .pipe(function() {
            return gulpif(enabled.rev, rev());
        })
        .pipe(function() {
            return gulpif(enabled.maps, sourcemaps.write('.', {
                sourceRoot: 'assets/styles/'
            }));
        })();
};

// ### Write to rev manifest
// If there are any revved files then write them to the rev manifest.
// See https://github.com/sindresorhus/gulp-rev
var writeToManifest = function(directory) {
    return lazypipe()
        .pipe(gulp.dest, path.dist + directory)
        .pipe(browserSync.stream, { match: '**/*.{js,css}' })
        .pipe(rev.manifest, revManifest, {
            base: path.dist,
            merge: true
        })
        .pipe(gulp.dest, path.dist)();
};

// ### Styles
// `gulp styles` - Compiles, combines, and optimizes Bower CSS and project CSS.
// By default this task will only log a warning if a precompiler error is
// raised. If the `--production` flag is set: this task will fail outright.
gulp.task('styles', ['wiredep'], function() {
    var merged = merge();
    manifest.forEachDependency('css', function(dep) {
        var cssTasksInstance = cssTasks(dep.name);
        if (!enabled.failStyleTask) {
            cssTasksInstance.on('error', function(err) {
                console.error(err.message);
                this.emit('end');
            });
        }
        merged.add(gulp.src(dep.globs, { base: 'styles' })
            .pipe(cssTasksInstance));
    });
    return merged
        .pipe(writeToManifest('styles'));
});

// ### Wiredep
// `gulp wiredep` - Automatically inject Less and Sass Bower dependencies. See
// https://github.com/taptapship/wiredep
gulp.task('wiredep', function() {
    var wiredep = require('wiredep').stream;
    return gulp.src(project.css)
        .pipe(wiredep())
        .pipe(changed(path.source + 'styles', {
            hasChanged: changed.compareSha1Digest
        }))
        .pipe(gulp.dest(path.source + 'styles'));
});

// ### JS processing pipeline
// Example
// ```
// gulp.src(jsFiles)
//   .pipe(jsTasks('main.js')
//   .pipe(gulp.dest(path.dist + 'scripts'))
// ```
var jsTasks = function(filename) {
    return lazypipe()
        .pipe(function() {
            return gulpif(enabled.maps, sourcemaps.init());
        })
        .pipe(concat, filename)
        .pipe(function() {
            return gulpif(enabled.minimize, uglify({
                compress: {
                    'drop_debugger': enabled.stripJSDebug
                }
            }));
        })
        .pipe(function() {
            return gulpif(enabled.rev, rev());
        })
        .pipe(function() {
            return gulpif(enabled.maps, sourcemaps.write('.', {
                sourceRoot: 'assets/scripts/'
            }));
        })();
};

// ### Scripts
// `gulp scripts` - Runs JSHint then compiles, combines, and optimizes Bower JS
// and project JS.
gulp.task('scripts', ['jshint', 'tslint', 'typescript'], function() {
    var merged = merge();
    manifest.forEachDependency('js', function(dep) {
        merged.add(
            gulp.src(dep.globs, { base: 'scripts' })
                .pipe(jsTasks(dep.name))
        );
    });
    return merged
        .pipe(writeToManifest('scripts'));
});

gulp.task('typescript', function() {
    return gulp.src(project.typescript)
        .pipe(ts({
            module: 'commonjs',
            removeComments: true
        }))
        .js
        .pipe(gulp.dest(path.build));
});

// ### JSHint
// `gulp jshint` - Lints configuration JSON and project JS.
gulp.task('jshint', function() {
    return gulp.src([
        'bower.json', 'gulpfile.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulpif(enabled.failJSHint, jshint.reporter('fail')));
});

// ### TSLint
// `gulp tslint` - Lints project TS.
gulp.task('tslint', function() {
    return gulp.src(project.typescript)
        .pipe(tslint())
        .pipe(gulpif(!enabled.failTSLint, tslint.report("prose", { emitError: false })))
        .pipe(gulpif(enabled.failTSLint, tslint.report("prose")));
});

// ### Fonts
// `gulp fonts` - Grabs all the fonts and outputs them in a flattened directory
// structure. See: https://github.com/armed/gulp-flatten
gulp.task('fonts', function() {
    return gulp.src(globs.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(path.dist + 'fonts'))
        .pipe(browserSync.stream());
});

// ### Images
// `gulp images` - Run lossless compression on all the images.
gulp.task('images', function() {
    return gulp.src(globs.images)
        .pipe(gulpif(enabled.minimize, imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{ removeUnknownsAndDefaults: false }, { cleanupIDs: false }]
        })))
        .pipe(gulp.dest(path.dist + 'assets/images'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src(project.html)
        .pipe(gulp.dest(path.dist))
        .pipe(browserSync.stream());
});

gulp.task('rev:html', ['html'], function() {
    var manifest = gulp.src(revManifest);

    return gulp.src(path.dist + 'index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(path.dist));
});

gulp.task('assets', function() {
    return gulp.src(project.assets)
        .pipe(gulp.dest(path.dist + path.assets))
        .pipe(browserSync.stream());
});

gulp.task('api', function() {
    return gulp.src(project.api)
        .pipe(gulp.dest(path.dist + path.api))
        .pipe(browserSync.stream());
});

// ### Clean
// `gulp clean` - Deletes the build folder entirely.
gulp.task('clean', require('del').bind(null, [path.dist]));

// ### Watch
// `gulp watch` - Use BrowserSync to proxy your dev server and synchronize code
// changes across devices. Specify the hostname of your dev server at
// `manifest.config.devUrl`. When a modification is made to an asset, run the
// build step for that asset and inject the changes into the page.
// See: http://www.browsersync.io
gulp.task('watch', function() {
    // browserSync.init({
    //     proxy: config.devUrl
    // });
    gulp.watch([path.source + 'styles/**/*'], ['styles']);
    gulp.watch([path.source + '**/*.ts'], ['scripts']);
    gulp.watch([path.source + 'fonts/**/*'], ['fonts']);
    gulp.watch([path.source + 'assets/images/**/*'], ['images']);
    gulp.watch([path.source + '**/*.html'], ['html']);
    gulp.watch(['bower.json', 'assets/manifest.json'], ['build']);
});

// ### Build
// `gulp build` - Run all the build tasks but don't clean up beforehand.
// Generally you should be running `gulp` instead of `gulp build`.
gulp.task('build', function(callback) {
    runSequence('styles',
        'scripts',
        ['fonts', 'images', 'html', 'assets', 'api', 'rev:html'],
        callback);
});

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
