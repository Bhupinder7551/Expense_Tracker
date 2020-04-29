const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    author: String,
    body: String,
    task_name: String

});

// Model
const BlogPost = mongoose.model('blogposts', BlogPostSchema);

module.exports = BlogPost;