const express = require("express");
const app = express();
const { getBlogDetail, createBlog, updateBlog, getEditForm, deleteBlog, getData } = require('./controller/blogController')
const cors = require('cors');
const { registerUser, loginUser } = require("./controller/userController");
const port = 3211
app.use(cors({
    origin: 'http://localhost:4321/', // Ganti dengan URL frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));``
app.use(express.json())

app.get('/', getData)
app.post('/', createBlog)

app.get('/detail/:id', getBlogDetail )

app.get('/edit/:id', getEditForm)

app.put('/edit/:id', updateBlog)

app.delete('/delete/:id', deleteBlog)

app.post('/login', loginUser)



app.post('/register',registerUser)

app.listen(port, () => {
    console.log(`https/localhost:${port}`)
})


