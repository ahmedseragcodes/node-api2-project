// implement your server here
// require your posts router and connect it here

//IMPORTS 
const express = require ("express");
const postsRouter = require("./posts/posts-router");

//INSTANCE

const server = express();

//GLOBAL MIDDLEWARE

server.use(express.json());

server.use("/api/posts", postsRouter);

module.exports = server;