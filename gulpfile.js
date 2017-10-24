'use strict';

// --------------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------------

var gulp         = require('gulp'),
	browserSync  	 = require('browser-sync'),
	watch 		 		 = require('gulp-watch'),
	concat		 		 = require('gulp-concat'),
	plumber 	 		 = require('gulp-plumber'),
	pug         	 = require('gulp-pug'),
	minifyHTML  	 = require('gulp-minify-html'),
	sass 		 			 = require('gulp-sass'),
	uncss       	 = require('gulp-uncss'),
	sourcemaps     = require('gulp-sourcemaps'),
	postcss        = require('gulp-postcss'),
	flexbugs       = require('postcss-flexbugs-fixes'),
	sorting        = require('postcss-sorting'),
	autoprefixer   = require('autoprefixer'),
	focus          = require('postcss-focus'),
	uglify 		 		 = require('gulp-uglify'),
	spritesmith    = require('gulp.spritesmith'),
	cheerio 	 		 = require('gulp-cheerio'),
	svgmin         = require('gulp-svgmin'),
	svgSprite      = require("gulp-svg-sprite"),
	replace        = require('gulp-replace'),
	clean          = require('del');

// --------------------------------------------------------------------------
// Settings
// --------------------------------------------------------------------------


var src = {
	html: 'src/**/*.pug',
	fonts: 'src/fonts/*',
	scss: 'src/scss/**/*.scss',
	js: 'src/js/**/*.js',
	images: 'src/images/**/*',
	svg: 'src/svg/**/*',
	video: 'src/video/**/*',

	spriteImages: 'src/sprites/_images/*.png',
	spriteSvg: 'src/sprites/_svg/*.svg'
};

var dist = {
	html: 'dist/',
	fonts: 'dist/fonts/',
	css: 'dist/css',
	js: 'dist/js',
	images: 'dist/images/',
	svg: 'dist/svg/',
	video: 'dist/video/',

	spriteImages: 'dist/sprites/',
	spriteSvg: 'dist/sprites/'
};


// --------------------------------------------------------------------------
// Sprites
// --------------------------------------------------------------------------


gulp.task('spriteImages', function () {
	var spriteData = gulp.src(src.spriteImages).pipe(spritesmith({

		algorithm: 'binary-tree',
		padding: 10,

		cssName: '_sprites.scss',
		cssFormat: 'scss',

	    imgName: 'sprite.png',
	    imgPath: '../sprites/sprite.png',

	    cssTemplate: 'src/sprites/_templates/scss.template.handlebars'

	}));
	spriteData.img.pipe(gulp.dest('dist/sprites/'));
	spriteData.css.pipe(gulp.dest('src/sprites/'));
	return spriteData;
});



gulp.task('spriteSvg', function () {
    return gulp
        .src(src.spriteSvg)
        .pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
        	mode: {
				symbol: {
					dest: "",
					prefix : '.',
            		dimensions : '.',
					sprite: "sprite.svg",
					render: {
						scss: {
							dest:'../../src/sprites/_spritesSvg.scss',
							template: "src/sprites/_templates/scss.templateSvg.handlebars"
						}
					}
				}
			}

        }))
        .pipe(gulp.dest('dist/sprites/'));
});

// --------------------------------------------------------------------------
// Html or Pug
// --------------------------------------------------------------------------

gulp.task('html', function() {

	return gulp.src(src.html)
		.pipe(plumber(

    ))
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest(dist.html))
		.pipe(browserSync.reload({ stream: true }))

});

// --------------------------------------------------------------------------
// Fonts
// --------------------------------------------------------------------------

gulp.task('fonts', function() {
    gulp.src(src.fonts)
        .pipe(gulp.dest(dist.fonts))
        .pipe(browserSync.reload({ stream: true }))
});


// --------------------------------------------------------------------------
// Images
// --------------------------------------------------------------------------


gulp.task('images', function() {

	return gulp.src(src.images)
		.pipe(gulp.dest(dist.images))
		.pipe(browserSync.reload({ stream: true }))

});


// --------------------------------------------------------------------------
// Svg
// --------------------------------------------------------------------------


gulp.task('svg', function() {

	return gulp.src(src.svg)
		.pipe(gulp.dest(dist.svg))
		.pipe(browserSync.reload({ stream: true }))

});


// --------------------------------------------------------------------------
// Video
// --------------------------------------------------------------------------


gulp.task('video', function() {

	return gulp.src(src.video)
		.pipe(gulp.dest(dist.video))
		.pipe(browserSync.reload({ stream: true }))

});

// --------------------------------------------------------------------------
// Scss
// --------------------------------------------------------------------------
var processors = [
  focus(),
  autoprefixer({
    browsers: ['last 10 versions'],
    remove: true, // remove outdated prefixes?
    // cascade: false
  }),
  sorting(),
  flexbugs()
];

gulp.task('scss', function() {

	return gulp.src(src.scss)
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss(processors))
		.pipe(concat('app.min.css'))
		.pipe(gulp.dest(dist.css))
		.pipe(browserSync.reload({ stream: true }))

});


// --------------------------------------------------------------------------
// Js
// --------------------------------------------------------------------------

gulp.task('js', function() {
	return gulp.src(src.js)

		.pipe(plumber())
		.pipe(uglify())
		.pipe(concat('app.min.js'))

		.pipe(gulp.dest(dist.js))
		.pipe(browserSync.reload({ stream: true }))
});


// --------------------------------------------------------------------------
// Clean
// --------------------------------------------------------------------------

gulp.task('clean', function() {
	return clean.sync('dist/');
});

// --------------------------------------------------------------------------
// COPY ROOT
// --------------------------------------------------------------------------


gulp.task('copy-root', function() {

	return gulp.src('src/pace.js')
		.pipe(gulp.dest('dist'))
		// .pipe(browserSync.reload({ stream: true }))
});

// --------------------------------------------------------------------------
// Watch
// --------------------------------------------------------------------------


gulp.task('watch', function() {

	browserSync.init({
		server: 'dist/',
		port: 8080,
		open: true,
    	notify: false
	});

	gulp.watch(src.spriteImages, ['spriteImages']);
	gulp.watch(src.spriteSvg, ['spriteSvg']);

	gulp.watch(src.html, ['html']);
	gulp.watch(src.fonts, ['fonts']);
	gulp.watch(src.images, ['images']);
	gulp.watch(src.svg, ['svg']);
	gulp.watch(src.video, ['video']);
	gulp.watch(src.scss, ['scss']);
	gulp.watch(src.js, ['js']);

});


// Gulp

gulp.task('default', ['clean', 'spriteImages', 'spriteSvg', 'html', 'fonts', 'images', 'svg', 'video', 'copy-root', 'scss', 'js', 'watch']);
