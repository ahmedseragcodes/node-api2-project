// require your server and launch it here


const server = require("./api/server");

server.listen(1234, ()=>{
    console.log("Listening On Port 1234")
})