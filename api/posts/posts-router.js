const express = require("express");
const Posts = require("./posts-model");

const router = express.Router();

//ENDPOINTS

//[GET] All Posts

router.get("/", (req, res, next)=>{

    Posts.find()
    .then((allPosts)=>{
        res.status(200).json(allPosts);
    })
    .catch((err)=>{
        res.status(500).json({message: "The posts information could not be retrieved"});
    })
});

//[GET] Post By Id

router.get("/:id", (req, res, next)=>{
    
    const { id } = req.params;
    
    Posts.findById(id)
    .then((specificPost)=>{
        if(!specificPost){
            res.status(404).json({message: "The post with the specified ID does not exist"});
        } else {
            res.status(200).json(specificPost);
        }
    })
    .catch((err)=>{
        res.status(500).json({message: "The post information could not be retrieved"});
    })
});

//[POST] New Post

router.post("/", (req, res, next)=>{

    const { title, contents } = req.body;

    const post = req.body;

    if(!title || !contents){
        res.status(400).json({message: "Please provide title and contents for the post"});
    } else {
        Posts.insert(post)
        .then(async (newPostId)=>{
            const newPost = await Posts.findById(newPostId.id);
            res.status(201).json(newPost);
        })
        .catch((err)=>{
            res.status(500).json({message: "There was an error while saving the post to the database"});
        })
    }


});

//[PUT] / Update Post By ID




module.exports = router;