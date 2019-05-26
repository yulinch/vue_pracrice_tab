var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    // sassGlob = require('gulp-sass-glob'),
    filter  = require('gulp-filter'),
    // gulpImagemin = require('gulp-imagemin'),
    gulpPlumber = require('gulp-plumber'),
    gulpNotify = require("gulp-notify"),
    del = require('del');

function errorLog(error) {
  console.error(error);
  this.emit('end');
}

// sass
gulp.task('sass', function () {

    const sf = filter(['**', '!original/sass/Websites/**/*.sass'], {restore: true, passthrough: false});
 
    const stream = gulp.src('sass/**/*.sass')
        .pipe(sf)
        // .on('error', errorLog)
        // .pipe(gulpPlumber())
        .pipe(sass({
            outputStyle: 'nested'
        }))
        .pipe(autoprefixer({
            browsers: ['last 5 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove:true //是否去掉不必要的前缀 默认：true
        }))  
        .pipe(gulp.dest('css'))
        // .pipe(gulpNotify("CSS Finish"));
 
    sf.restore
      // .on('error', errorLog)
        // .pipe(gulpPlumber())
      .pipe(sass({
            outputStyle: 'nested'
        }))
        .pipe(autoprefixer({
            browsers: ['last 5 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove:true //是否去掉不必要的前缀 默认：true
        })) 
        .pipe(gulp.dest('./'))
      .pipe(gulpNotify("Websites CSS Finish"));
 
    return stream;
});

// clean
gulp.task('clean', function() {  
    return del(['css/**']);
});

// default
gulp.task('default',gulp.series('clean', function(){
    gulp.run('sass');
}))

// watch
gulp.task('watch', function(){
    gulp.watch('sass/**/*.sass', gulp.series('sass'));
});

