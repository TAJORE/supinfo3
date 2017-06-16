/**
 * Created by Danick takam on 15/06/2017.
 */

var gulp = require('gulp');
var sass = sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var copy = copy = require('gulp-copy');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglifyjs');
var minify = require('gulp-minifier');
var plumber = require('gulp-plumber');
var exec = require('child_process').exec;
var rename = require('gulp-rename');

var jsPaths = ['./web/bundles/*/js/*.js'];
var currentTask = "";

var supportedBrowsers = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 5'
];

var scriptTask = function()
{
    gulp.src(jsPaths)
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            minifyCSS: false,
            getKeptComment: function (content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        })).pipe(gulp.dest('./web/data/js'))
        .pipe(livereload());
};

var sassTask = function()
{
    gulp.src('./web/bundles/app/sass/master.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({sourceComments: 'map'}))
        .pipe(rename('master.css'))
        .pipe(cssnano({
            autoprefixer: {browsers: supportedBrowsers, add: true}
        }))
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: false,
            minifyCSS: true,
            getKeptComment: function (content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./web/data/css'))
        .pipe(livereload());
};

var imageTask = function()
{
    console.log("Image copy's successfull !");
    return gulp.src('./web/bundles/*/img/*')
        .pipe(copy('./web/data/img', {prefix: 5}));
};

var uglifyTask = function()
{
    gulp.src(jsPaths)
        .pipe(uglify('master.min.js', {
            outSourceMap: true
        }))
        .pipe(gulp.dest('web/data/js'))
        .pipe(livereload());

    console.log('Uglify JS files successfull !');
};

gulp.task('default', function(){
    exec('php bin/console assets:install --symlink', logStdOutAndErr);
});

gulp.task('asset', function ()
{
    exec('php bin/console assets:install --symlink', logStdOutAndErr);
});

gulp.task('cache-dev', function ()
{
    exec('php bin/console cache:clear --env=dev', function(err, stdout, stderr)
    {
        //console.log(stdout + stderr);
        console.log("Cache dev cleared  successfully !!!");
    });
});

gulp.task('cache-dev', function ()
{
    exec('php bin/console cache:clear --env=prod', function(err, stdout, stderr)
    {
        //console.log(stdout + stderr);
        console.log("Cache prod cleared successfully !!!");
    });
});

gulp.task('sass', ['installAssets'], function ()
{
    currentTask = 'sass';
});

gulp.task('img', ['installAssets'], function ()
{
    currentTask = 'img';
});

gulp.task('js', ['installAssets'], function()
{
    currentTask = 'js';
});

gulp.task('file', ['installAssets'], function()
{
    currentTask = 'file';
});

// Without this function exec() will not show any output
var logStdOutAndErr = function (err, stdout, stderr)
{
    //console.log(stdout + stderr);
    console.log("Assets installed !!!");

    if(currentTask == 'sass')
    {
        sassTask();
    }
    else if(currentTask == 'js')
    {
        uglifyTask();
    }
    else if(currentTask == 'img')
    {
        return imageTask();
    }
    else if(currentTask == 'file')
    {
        uglifyTask();
    }
};

gulp.task('watch', function ()
{
    // Starts the server
    livereload.listen();

    gulp.watch('./src/Web/*/Resources/public/sass/**/*.scss', ['installAssets'])
        .on('change', function(event){
            console.log('File '+event.path+' has been '+event.type);

            currentTask = 'sass';
        });

    gulp.watch('./src/Web/*/Resources/public/js/**/*.js', ['installAssets'])
        .on('change', function(event){
            console.log('File '+event.path+' has been '+event.type);

            currentTask = 'js';
        });
});