var http = require('http')
var favicon = require('serve-favicon')
var finalhandler = require('finalhandler')
var path = require('path')
const fs = require('fs')

var _favicon = favicon(path.join(__dirname, 'favicon.ico'))

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)

    })
}

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err)
                reject(err)
            else resolve(data)
        })
    })
}

var server = http.createServer(function onRequest(req, res) {
    var done = finalhandler(req, res)

    _favicon(req, res, async function onNext(err) {
        if (err) return done(err)

        switch (req.url) {
            case '/students':
                res.write('STUDENTS ' + counter)
                break;
            case '/courses':
                res.write('COURSES')
                break;
            case '/home':
                const data = await readFile('pages/home.html')
                res.write(data)
                res.end()
                break;
            case '/about':
                await delay(3000)
                res.write('about')
                res.end()
                break;
            default:
                res.write('404 not found')
                break;
        }

    })
})

server.listen(3003)