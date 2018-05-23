/**
 * 应用程序的启动（入口）文件
 * @type {*|createApplication}
 */

// 加载 express 模块
var express = require('express');
// 加载模板处理模块
var swig = require('swig');
// 创建 app 应用 => NodeJS Http.createServer();
var app = express();


// 设置静态文件托管
// 当用户访问的 url 以 /public 开始，那么直接返回对应的 __dirname + '/public' 下的文件
app.use('/public', express.static(__dirname + '/public'));


// 配置应用模板
// 定义当前应用所使用的模板引擎
// 第一个参数：模板引擎的名称，同时也是模板文件的后缀
// 第二个参数：表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
// 设置模板文件存放的目录
// 第一个参数必须是views
// 第二个参数是目录
app.set('views', './views');
// 注册所使用的模板引擎
// 第一个参数必须是 view engine
// 第二个参数和 app.engine 这个方法中定义的模板引擎的名称（第一个参数）必须是一致的
app.set('view engine', 'html');
// 在开发过程中，需要取消模板缓存
swig.setDefaults({cache: false});

/**
 * 首页
 * req request 对象
 * res response 对象
 * next 函数
 */
app.get('/', function (req, res, next) {
    // res.send('<h1>欢迎光临我的博客！</h1>')

    /*
     * 读取 views 目录下的指定文件，解析并返回给客户端
     * 第一个参数：表示模板的文件，相对于 views 目录，找到 views/index.html
     * 第二个参数：传递给模板使用的数据
     */
    res.render('index');
});

// app.get('/main.css', function (req, res, next) {
//     res.setHeader('content-type', 'text/css');
//     res.send("body {background: red;}");
// });

// 监听 http 请求
app.listen(8081);