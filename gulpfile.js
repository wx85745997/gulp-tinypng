var gulp = require('gulp');
var tinypng = require('gulp-tinypng-compress');
var key = 'YOUR_API_KEY'
var tinify = require("tinify");
tinify.key = key;

tinify.validate(function (err) {
    if (err) throw err;
    var compressionsThisMonth = tinify.compressionCount;
    // Validation of API key failed.
    //显示压缩计数(在本次压缩之前)
    console.log("压缩开始>>>>>>>>>>>>压缩计数:" + compressionsThisMonth + "/500")
})




gulp.task("tinypng", function () {
    gulp.src('img/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: key,//TinyPNG API密钥
            sigFile: 'images/.tinypng-sigs',//如果设置为文件名，它将比较现有的源文件md5签名与文件的json数据中找到的签名
            sameDest: false, //如果您的来源与您的目的地相同（图像是自己写的），并且您想要使用签名检查功能，请将其设置为true
            summarize: true,//一旦处理完所有图像，输出统计数据。
            log: true,//设置为true以将错误和消息记录到控制台
            parallel: true,//允许并发上传到TinyPNG服务器以加快总压缩时间。
            //parallelMax:10,//一次上传的最大数量
            force: false,//无论签名如何，强制压缩图像
            ignore: false//忽略文件如果glob匹配
        })).on('error', function (err) {
            console.error(err.message);
        })
        .pipe(gulp.dest('dis/img'))
        .on('end', function () {
            tinify.validate(function (err) {
                if (err) throw err;
                var compressionsThisMonth = tinify.compressionCount;
                // Validation of API key failed.
                //显示压缩计数(在本次压缩之后)
                console.log("压缩结束>>>>>>>>>>>>压缩计数:" + compressionsThisMonth + "/500")
            })
        })
});

