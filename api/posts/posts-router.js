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

//[PUT] Specific Post

router.put("/:id", (req, res)=>{
    const { id }=req.params;
    const post = req.body;

    Posts.update(id, post )
    .then((numberOfRecs)=>{
        if (numberOfRecs){
            return Posts.findById(id)
        } else {
            res.status(404).json({message: "No records found"});
        }
    })
    .then((post)=>{
        if (post){
            res.status(200).json(post);
        } 
    })
    .catch((err)=>{
        res.status(500).json({message: err.message})
    })
})

//[POST] new Post
router.post("/", (req, res)=>{

    const newPost = req.body;

    Posts.insert(newPost)
    .then((postId)=>{
        return Posts.findById(postId.id);
    })
    .then((post)=>{
        if (post){
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "No Post Found With That Id"})
        }
    })
    .catch((err)=>{
        res.status(500).json({message: err.message})
    })
})

//[DELETE] Post 

router.delete("/:id", (req, res)=>{

    const { id }=req.params;

    Posts.remove(id)
    .then((numOfRecs)=>{
        if (numOfRecs){
            return Posts.findById(id);
        } else {
            res.status(404).json({message: "No records matched that id"})
        }
    })
    .then((post)=>{
        res.status(200).json(post);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message})
    })
})

//EXPORTS

module.exports = router;