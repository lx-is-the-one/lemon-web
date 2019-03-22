const gulp = require("gulp");
const sass = require("gulp-sass");
const webserver = require("gulp-webserver");
gulp.task("devCss", () => {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css"))
})
gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(webserver({
            port: 8989,
            livereload: true,
            proxies: [
                { source: "/api/getUser", target: "http://localhost:3000/api/getUser" }
            ]
        }))
})
gulp.task("watch", () => {
    gulp.watch("./src/sass/*.scss", gulp.series("devCss"))
})
gulp.task("default", gulp.series("devCss", "server", "watch"))