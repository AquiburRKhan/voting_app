var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    nodemon = require('gulp-nodemon'),
    path = require('path'),
    livereload = require('gulp-livereload'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] }),
    runSequence = require('run-sequence');

gulp.task('less', function () {
    return gulp.src('./public/styles/*.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('./public/styles'))
        .pipe(livereload());

});

gulp.task('start', function() {
    nodemon({
        script: 'server.js',
        ignore: '/public'
    })

    //also watching server files
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./public/styles/*.less', ['less']);
    gulp.watch(['./public/js/**/*.js','./public/js/*.js'],['reloadBrowser']);
    gulp.watch(['./public/views/**/*.html','./public/*.html'],['reloadBrowser']);

});

gulp.task('reloadBrowser', function(){
   livereload.reload()
});

gulp.task('default', function(callback) {
    runSequence('less',
        'watch',
        'start',
        callback);
});