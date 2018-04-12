var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var fileinclude = require('gulp-file-include');
// var del = require('del');
var reload = browserSync.reload;


// 静态服务器
gulp.task('server', ['sass','fileinclude'], function () {
    browserSync.init({
        server: './dist'
    });
    gulp.watch("src/sass/*.scss", ['sass']);
    gulp.watch('./src/**/*.html', ['fileinclude']).on('change', reload);
});

gulp.task('sass', function () {
    return gulp.src("./src/sass/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./dist/css"))
        .pipe(reload({ stream: true }));
});

gulp.task('fileinclude', function () {
    gulp.src(['./src/views/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./dist'));
});

// gulp.task('clean', function () {
//     return del.sync('./dist');
// });

gulp.task('build', function () {
    gulp.start('fileinclude')
    console.log('html文件构建中...')
})

gulp.task('def', ['fileinclude', 'server']);