var http = require('http')
var favicon = require('serve-favicon')
var finalhandler = require('finalhandler')
var path = require('path')

var _favicon = favicon(path.join(__dirname, 'favicon.ico'))

let counter = 0

var server = http.createServer(function onRequest(req, res) {
    console.log("req", req.method)
    console.log("req145", req.url)
    counter++
    var done = finalhandler(req, res)

    _favicon(req, res, function onNext(err) {
        if (err) return done(err)

        switch (req.url) {
            case '/students':
                res.write('STUDENTS ' + counter)
                break;
            case '/courses':
                res.write('COURSES')
                break;
            default:
                res.write('404 not found')
                break;
        }


        res.statusCode = 404
        res.end(' oops')
    })
})

server.listen(3003)