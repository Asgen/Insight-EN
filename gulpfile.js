"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var csso = require("gulp-csso");
var autoprefixer = require("autoprefixer");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var posthtml = require("gulp-posthtml");
var htmlmin = require("gulp-htmlmin");
var concat = require('gulp-concat');
var del = require("del");
var server = require("browser-sync").create();

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/*.txt",
    "source/img/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("css", function () {
 return gulp.src("source/sass/style.scss")
   .pipe(plumber())
   .pipe(sass())
   .pipe(postcss([
     autoprefixer()
    ]))
   .pipe(gulp.dest("build/css"))
   .pipe(csso())
   .pipe(rename("style.min.css"))
   .pipe(gulp.dest("build/css"))
   .pipe(server.stream());
});

gulp.task("images", function(){
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("scripts", function() {
  return gulp.src("source/js/*.js")
    .pipe(concat("allEn.js"))
    .pipe(gulp.dest("build/js"));
});


gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("scripts", "refresh"));
});

gulp.task("build", gulp.series("clean", "copy", "css", "html", "scripts"));

gulp.task("start", gulp.series("build", "server"));
