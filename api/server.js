const express = require("express");
const cors = require("cors");
const postsRouter = require("./posts/posts-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use("/api/posts", postsRouter);

//SANITY ENDPOINT
server.get("/", (req, res, next)=>{
    res.json({message: "API Up"});
});

module.exports = server;