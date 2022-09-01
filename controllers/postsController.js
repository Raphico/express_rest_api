const { getAll, getById, createPost, updatePost, deletePost } = require('../models/postsModel');

// @desc get all data from the api
// @routes /api/posts
const getAllPosts = async(req, res) =>
{
  try
  {
    const posts = await getAll();
    res.status(200).json(posts);
  }
  catch (error)
  {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
}

// @desc get single data from the api
// @routes /api/posts/id
const getSinglePost = async(req, res, id) =>
{
  try
  {
    const post = await getById(req.params.id);
    if (post)
    {
      res.status(200).json(post);
    }
    else
    {
      res.status(404).json({ msg: 'Post not found' })
    }
  }
  catch (error)
  {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
  
}

// @desc create a new post
// @route /api/posts
const createNewPost = async(req, res) =>
{
  try 
  {
    const post = {
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
      likes: req.body.likes,
      tags: req.body.tags
    }

    const isValid = Object.values(post).every(value => {
      if (value === undefined || value === '' || value === null)
      {
        return false
      }
      return true
    })

    if (isValid)
    {
      const newPost = await createPost(post);
      res.status(201).json(newPost); 
    }
    else
    {
      res.status(500).json({ msg: "invalid post" })
    }
  } 
  catch (error) 
  {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
}

// @desc create a new post
// @route /api/posts
const updatePostInApi = async(req, res) =>
{
  try 
  {
    const post = await getById(req.params.id);

    if (post)
    {
      const updPost = {
        title: req.body.title || post.title,
        body: req.body.body || post.body,
        category: req.body.category || post.category,
        likes: req.body.likes || post.likes,
        tags: req.body.tags || post.tags
      }
      const newPost = await updatePost(req.params.id, updPost);
      res.status(200).json(newPost);
    }
    else
    {
      res.status(404).json({ msg: "Post not found" })
    }
  } 
  catch (error) 
  {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
}

const deletePostFromApi = async(req, res) =>
{
  try 
  {
    const post = await getById(req.params.id);

    if (post)
    {
      const newPosts = await deletePost(req.params.id);
      res.json(newPosts);
    }
    else
    {
      res.status(404).json({ msg: "Post not found" })
    }
  } 
  catch (error) 
  {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
}

module.exports = {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePostInApi,
  deletePostFromApi
}
