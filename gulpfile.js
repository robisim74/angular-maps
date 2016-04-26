// Plug-ins.
var gulp = require('gulp'),
    del = require('del');

// Script paths.
var dest = 'dist';

// Clean task: cleans the contents of the distribution directory.
gulp.task('clean', function() {

    return del(dest);

});

// Copy task: copies dependencies.
gulp.task('copy:libs', ['clean'], function() {

    return gulp.src([
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js'
    ])
        .pipe(gulp.dest('dist/lib'))

});

gulp.task('default', ['copy:libs']);