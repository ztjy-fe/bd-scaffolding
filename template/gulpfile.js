var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    precss = require('precss'),
    colorRgbaFallback = require('postcss-color-rgba-fallback'),
    opacity = require('postcss-opacity'),
    pseudoelements = require('postcss-pseudoelements'),
    cssmin = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('autoprefixer'),
    htmlmin = require('gulp-htmlmin'),
    usemin = require('gulp-usemin'),
    px2rem = require('postcss-px2rem'),
    del = require('del');

//压缩css
gulp.task('cssmin', function() {
    var postcssPlugins = [
        autoprefixer({
            browsers: 'last 6 versions',
            cascade: false
        }),
        px2rem({remUnit: 75}),
        precss,
        colorRgbaFallback,
        opacity,
        pseudoelements
    ];

    return gulp.src('src/css/*.css')
        .pipe(postcss(postcssPlugins))
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('px2rem', function() {
    var processors = [
        px2rem({remUnit: 75})
    ];
    return gulp.src('src/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/css/'))
});

//拷贝图片
gulp.task('copyimages', function() {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'))
});

//字体拷贝
gulp.task('copyfont', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
});

//压缩html，合并文件引用
var htmlOptions = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
};
var cssOptions = {
    advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
    compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
    keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
};
var jsOptions = {
    ie8: true
};
gulp.task('minifyhtml', function() {
    return gulp.src('src/*.html')
        .pipe(usemin({
            js: [function() {
                return uglify(jsOptions);
            }],
            css: [function() {
                return cssmin(cssOptions);
            }],
            html: [function() {
                return htmlmin(htmlOptions);
            }]
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function(cb) {
    return del(['./dist'], cb);
});

gulp.task('dev', function(cb) {
    gulp.watch('src/css/*.css',['px2rem'], function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['clean'], function() {
    gulp.start('cssmin', 'copyfont', 'copyimages', 'minifyhtml');
});