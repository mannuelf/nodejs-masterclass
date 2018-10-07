
// Primary file for the API
const http = require('http')
const url = require('url')
const stringDecoder = require('string_decoder').StringDecoder

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
    var decoder = new stringDecoder('utf-8')
    let buffer = ''
    // payload gets streamed in on the data event, decoder writes/saves data to the buffer.
    req.on('data', function(data) {
        buffer += decoder.write(data)
    })
    req.on('end', function() {
        buffer += decoder.end()
        
        // log what path the user was asking for.
        // console.log('Request received on path: ' + trimmedPath
        // + ', with this method: ' + method 
        // + ', with these query string parameters: ' + queryStringObject)

        console.log('Request received with this payload', buffer)

        // send the response.
        res.end('Hello World\n')
    })
})

// start server, have it listen on port 3000
server.listen(3001, function() {
    console.log("The serve is listening on port 3001 now")
})

