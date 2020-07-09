const { src, dest, parallel, series, watch, task } = require("gulp");
const dom = require("gulp-jsdom");
const postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
var rename = require("gulp-rename");
const babel = require("gulp-babel");
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');

styleEditTask = () => {
  return src("_site/*.html")
    .pipe(
      dom(function (document, window) {
        Object.values(document.getElementsByTagName("style")).forEach((e) => {
          e.remove();
        });
      })
    )
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
    .pipe(postcss(plugins))
    .pipe(cleanCSS({compatibility: 'ie8'}))
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
    .pipe(htmlmin({ collapseWhitespace: true }))
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
      .pipe(babel({
        presets: ['@babel/env']
        }))
      .pipe(terser({
          keep_fnames: true,
          mangle: false
        }))
      .pipe(dest("_site/assets/js"))
  );
};

exports.build = series(
  styleExportTask,
  jsExportTask,
  jsEditTask,
  styleEditTask
);

exports.default = function() { watch(
  ["_layouts/", "_includes", "_data", 'assets', "./*.html"],
   { delay: 600 },
  series(styleExportTask, jsExportTask, jsEditTask, styleEditTask))
};
