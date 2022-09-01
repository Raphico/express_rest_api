const posts = require('../data/posts.json');
const { writePostToFile, UpdateFile } = require('../utils');
const uuid = require('uuid');

const getAll = () =>
{
  return new Promise((resolve, reject) => {
    resolve(posts);
  })
}

const getById = (id) =>
{
  return new Promise((resolve, reject) => {
    const post = posts.find(post => post.id === id);
    resolve(post);
  })
}

const createPost = (post) => 
{
  return new Promise((resolve, reject) => {
    const newPost = { id: uuid.v4(), ...post }
    posts.push(newPost);
    writePostToFile('./data/posts.json', posts);
    resolve(posts);
  })
}

const updatePost = (id, updPost) => 
{
  return new Promise((resolve, reject) => {
    const index = posts.findIndex(p => p.id === id);
    posts[index] = {id: uuid.v4() , ...updPost};
    UpdateFile('./data/posts.json', posts);
    resolve(posts[index]);
  });
}

const deletePost = (id) =>
{
  return new Promise((resolve, reject) => {
    const newPosts = posts.filter(p => p.id !== id);
    UpdateFile('./data/posts.json', newPosts);
    console.log(newPosts);
    resolve(newPosts);
  });
}

module.exports = {
  getAll,
  getById,
  createPost,
  updatePost,
  deletePost
}
