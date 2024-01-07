const mongoose = require('mongoose')
const dotenv = require('dotenv')
const BlogPost = require('./models/BlogPost')

dotenv.config({path: './.env'})
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)
mongoose.connect(DB).then(() => console.log('DB connection successful!'));

async function createBlog(){
try{
const blog = await BlogPost.create({
    title: "The Mythbuster’s Guide to Saving Money on Energy Bills",
    body: "If you have been here a long time, you might remember when I went on ITV Tonight to \ndispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money \ntopics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. \n You know those bullet-point lists. You start spotting them everything at this time of year. \nThey go like this:"
})
    console.log("Blog post created successfully:", blog);
    console.log(blog.toJSON());
} catch (error)
{
    console.error("Error creating blog post:", error)
    }
}
createBlog();