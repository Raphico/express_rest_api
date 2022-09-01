const express = require('express');
const { getAllPosts, getSinglePost, createNewPost, updatePostInApi, deletePostFromApi } = require('./controllers/postsController');

const app = express();

// init body parser middleware
app.use(express.json());

app.get('/api/posts', (req, res) => {
  getAllPosts(req, res);
});

app.get('/api/posts/:id', (req, res) => {
  getSinglePost(req, res);
});

app.post('/api/posts', (req, res) => {
  createNewPost(req, res);
});

app.put('/api/posts/:id', (req, res) => {
  updatePostInApi(req, res);
})

app.delete('/api/posts/:id', (req, res) => {
  deletePostFromApi(req, res)
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at Port ${PORT}`));
