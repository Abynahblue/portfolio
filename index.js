const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const BlogPost = require('./models/BlogPost.js')

dotenv.config({path: './.env'})

const app = express();

app.use(fileUpload());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)
mongoose.connect(DB).then(() => console.log('DB connection successful!'));


const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.listen(4000, () => {
    console.log('App is running on port 4000');
})
app.get('/',  async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
})
app.get('/about', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/post/new', async(req, res) => {
    res.render('create')
})
app.post('/posts/store', async (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
        await BlogPost.create(req.body)
        .then(blogpost => {
        res.redirect('/')
    })  
    })
 })

 app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    if(!blogpost) return res.send("<h1>No blogs to display</h1>")
    res.render('post',{
        blogpost
    })
})