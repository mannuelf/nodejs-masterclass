
// Primary file for the API
const http = require('http')

let server = http.createServer(function(req, res) {
    res.end('Helle World\n')
})

// start server, have it listen on port 3000
server.listen(3000, function() {
    console.log("The serve is listening on port 3000 now")
})

