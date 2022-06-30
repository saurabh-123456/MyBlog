const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const _ = require("lodash");
const { lowerCase } = require('lodash');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
const posts  =  [];
app.get("/",function(req,res){
    res.render("index",{posts:posts});
})
app.get("/compose",function(req,res){
    res.render("compose");
})
app.get("/about",function(req,res){
    res.render("about");
})
app.get("/contact",function(req,res){
    res.render("contact");
})
app.post("/compose",function(req,res){
    const post = {
        name : req.body.yourName,
        item : req.body.item,
        time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    }
    if(post.item!="")
    {
        posts.push(post);
    }
    res.redirect("/");
})
app.get("/posts/:postName",function(req,res){
    const requestedTitle = _.lowerCase(req.params.postName);
    posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.name);
        if(storedTitle==requestedTitle)
        {
            res.render("post",{ title: post.name, content: post.item ,time: post.time});
        }
    });
});

app.listen(3000,function(){
    console.log("Server started on port 3000");
})