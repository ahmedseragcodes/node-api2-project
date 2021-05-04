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



module.exports = router;