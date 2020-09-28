const http = require('http');
const fs = require('fs');
const mysql = require('mysql');

let count = 1;

http.createServer(
    function(request, response) {
        let url = request.url;
        console.log('The client request has been received. url: ' + url);
        
        // 响应获取 html 的请求。
        if(url === '/') {
            response.writeHead(200, 'Content-Type', ['text/html', 'charset:utf-8']);
            let data = fs.readFileSync('./app/index.html');
            response.write(data);
            response.end();
        }

        // 响应获取图片资源的请求。
        if(url === '/rustImg') {
            response.writeHead(200, 'Content-Type', ['image/png', 'charset:utf-8']);
            let data = fs.readFileSync('./app/res/rust.png', 'binary');
            response.write(data, 'binary');
            response.end();
        }

        // 响应客户端点击按钮获取相关资源的请求。
        if(url === '/btnOnClick') {
            accessDatabase(
                function(result) {
                    response.writeHead(200, 'Content-Type', ['application/json', 'charset:utf-8']);
                    response.write(JSON.stringify(result));
                    response.end();
                }
            );
        }
    }
).listen(8080,
    function() {
        console.log('The http server started successfully.');
    }
);

// 访问数据库。
function accessDatabase(callBack) {
    const sqlStatement = 'select * from book where id = ?';
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'test'
    });
    connection.connect();
    connection.query(sqlStatement, count++,
        function(err, results) {
            if (err) {
                console.log(`SQL ERROR: ${err}`);
                callBack([]);
            }
            else {
                callBack(results);
            }
        }
    );
    connection.end();
}