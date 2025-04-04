const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
    title: String,
    body: String,
    username: String,
    email: String,
    image: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;