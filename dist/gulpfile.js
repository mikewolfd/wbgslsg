const { src, dest, parallel, series, watch, task } = require("gulp");
const dom = require("gulp-jsdom");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const cleanCSS = require('gulp-clean-css');
const responsive = require('gulp-responsive')
const imagemin = require('gulp-imagemin');
const cssbeautify = require('gulp-cssbeautify');
const htmlbeautify = require('gulp-html-beautify');
const beautify = require('gulp-jsbeautifier');
const purgecss = require('gulp-purgecss');

styleEditTask = () => {
  return src("_site/*.html")
    .pipe(
      dom(function (document, window) {
        Object.values(document.getElementsByTagName("style")).forEach((e) => {
          e.remove();
        });
      })
    )
    .pipe(htmlbeautify({ "preserve_newlines": false, }))
    .pipe(dest("_site"));
};

styleExportTask = () => {
  var plugins = [autoprefixer({ browsers: ["last 2 versions"] })];
  return src("_site/*.html")
    .pipe(
      dom(function (document, window) {
        let style = "";
        Object.values(document.getElementsByTagName("style")).forEach((e) => {
          style += e.innerHTML;
        });
        return style;
      })
    )
    .pipe(rename({ extname: ".css" }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(purgecss({
      content: ["_site/*.html"]
    }))
    .pipe(cssbeautify({
      openbrace: 'separate-line',
      autosemicolon: true
    }))
    .pipe(dest("_site/assets/css"));
};

jsEditTask = () => {
  return src("_site/*.html")
    .pipe(
      dom(function (document, window) {
        Object.values(document.getElementsByTagName("script"))
          .filter((i) => i.attributes["src"] === undefined)
          .forEach((e) => {
            e.remove();
          });
      })
    )
    .pipe(dest("_site"));
};

jsExportTask = () => {
  return (
    src("_site/*.html")
      .pipe(
        dom(function (document, window) {
          let script = "";
          Object.values(document.getElementsByTagName("script"))
            .filter((i) => i.attributes["src"] === undefined)
            .forEach((e) => {
              script += e.innerHTML;
            });
          return script;
        })
      )
      .pipe(rename({ extname: ".js" }))
      .pipe(beautify())
      // .pipe(babel({
      //   presets: ['@babel/env']
      // }))
      .pipe(dest("_site/assets/js"))
  );
};

imageMin = () => {
  return src('assets/images/background-original/*')
    .pipe(imagemin({
      interlaced: true,
      quality: 85,
      progressive: true,
    })
    )
    .pipe(dest('assets/images/background'))

}
responsiveImageTask = () => {
  return src("assets/images/splash-original/*.jpg")
    .pipe(
      responsive(
        {
          // Resize all JPG images to three different sizes: 200, 500, and 630 pixels
          '*.jpg': [
            {
              width: 400,
              rename: { suffix: '-400w' }
            },
            {
              width: 800,
              rename: { suffix: '-800w' }
            },
            {
              width: 1280,
              rename: { suffix: '-1280w' }
            },
            {
              width: 1600,
              rename: { suffix: '-1600w' }
            },
            {
              width: 2000,
              rename: { suffix: '-2000w' }
            },
            {
              width: 2560,
              rename: { suffix: '-2560w' }
            },
            {
              width: 3070,
              rename: { suffix: '-3070w' }
            },
            {
              // Compress, strip metadata, and rename original image
              rename: { suffix: '-original' }
            }
          ]
        },
        {
          // Global configuration for all images
          // The output quality for JPEG, WebP and TIFF output formats
          quality: 70,
          // Use progressive (interlace) scan for JPEG and PNG output
          progressive: true,
          // Strip all metadata
          withMetadata: false
        }
      )
    )
    .pipe(dest('assets/images/splash'))
}
exports.build = series(
  styleExportTask,
  jsExportTask,
  jsEditTask,
  styleEditTask
);

exports.responsiveImageTask = responsiveImageTask
exports.imageMin = imageMin

exports.default = function () {
  watch(
    ["_layouts/", "_includes", "_data", 'assets', "./*.html"],
    { delay: 600 },
    series(styleExportTask, jsExportTask, jsEditTask, styleEditTask))
};
