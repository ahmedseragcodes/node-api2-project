// implement your posts router here

//IMPORTS

const Posts = require("./posts-model");
const express = require("express");
const router = express.Router();

//ENDPOINTS

//[GET] ALL POSTS

router.get("/", (req, res)=>{
    Posts.find()
    .then((post)=>{
        res.status(200).json(post);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message})
    })
})

//[GET] SPECIFIC POST
router.get("/:id", (req, res)=>{
    const { id }=req.params;
    Posts.findById(id)
    .then((post)=>{
        res.status(200).json(post);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message})
    })
})

//[GET] Comments On Specific Post
router.get("/:id/comments", (req, res)=>{
    const { id }=req.params;
    Posts.findPostComments(id)
    .then((postComments)=>{
        res.status(200).json(postComments);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message})
    })
})


//EXPORTS

module.exports = router;