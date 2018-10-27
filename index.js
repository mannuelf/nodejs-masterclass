
// Primary file for the API
const http = require('http')
const url = require('url')
const stringDecoder = require('string_decoder').StringDecoder
const config = require('./config')

let server = http.createServer(function(req, res) {
    // get url and parse it.
    let parsedUrl = url.parse(req.url, true)

    // get the path from url. 
    let path = parsedUrl.pathname
    let trimmedPath = path.replace(/^\/+|\/+$/g, '')
    
    // get the query string from the object
    let queryStringObject = parsedUrl.query

    // get the HTTP method
    let method = req.method.toLowerCase()

    // get the header as an object
    let headers = req.headers
    
    // get the payload if there is any
    let decoder = new stringDecoder('utf-8')
    let buffer = ''
    // payload gets streamed in on the data event, decoder writes/saves data to the buffer.
    req.on('data', function(data) {
        buffer += decoder.write(data)
    })
    req.on('end', function() {
        buffer += decoder.end()
        
        // choose the handler the request should go to
        let chosenHandler = typeof(router[trimmedPath] !== 'undefined') ? router[trimmedPath] : handlers.notFound

        // construct the data object to send to the handler
        let data = {
            'trimmedPath': trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        }

        // route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload) {
            // use the status code called back by the handler
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200

            // use the payload called back by the handler, or default to an empty object
            payload = typeof(payload) === 'object' ? payload : {}

            // convert the payload to a string, cannot send user the object duh
            let payloadString = JSON.stringify(payload)

            // return the response
            res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode)
            res.end(payloadString)

            console.log('Request this response', statusCode, payloadString)
        })
    })
})

let port = config.port

// start server, have it listen on port 3000
server.listen(port, function() {
    console.log('The serve is listening on port ' + port + ' in ' + config.envName + ' mode')
})

// define the handlers
let handlers = {}

// sample handler
handlers.sample = function(data, callback) {
    // callback a http status code, and a payload object
    callback(406, {'name' : 'sample handler'})
}

// not found handler
handlers.notFound = function(data, callback) {
    callback(404)
}

// define a request router
let router = {
    'sample' : handlers.sample
}