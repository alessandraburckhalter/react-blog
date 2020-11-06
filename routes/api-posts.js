const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET all posts */
router.get('/', function(req, res) {
  models.Post.findAll()
    .then(posts => {
      res.json(posts)
    })
});

// Get 1 Post by ID
// GET /api/v1/posts/102
router.get('/:waffles', (req, res) => {
  models.Post.findByPk(req.params.waffles)
    .then(post => {
      if (post) {
        res.json(post)
      } else {
        res.status(404).json({
          error: 'Post not found'
        })
      }
    })
})

// Create new Post
router.post('/', (req, res) => {
  if (!req.body || !req.body.author || !req.body.title || !req.body.content || !req.body.published) {
    res.status(400).json({
      error: 'Please, submit all required fields'
    })
    return;
  }
  models.Post.create({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    published: req.body.published
  })
    .then((post) => {
      res.status(201).json(post)
    })
})

// Update Post
// PUT /api/v1/posts/101
router.put('/:waffles', (req, res) => {
  if (!req.body || !req.body.author || !req.body.title || !req.body.content || !req.body.published) {
    res.status(400).json({
      error: 'Please, submit all required fields'
    })
    return;
  }
  models.Post.update({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    published: req.body.published
  }, {
    where: {
      id: req.params.waffles
    }
  })
  .then(updated => {
    if (updated && updated[0] === 1) {
    res.status(202).json({
      success: 'Post Updated'
    });
  } else {
    res.statye(404).json({
      error: 'Post not found'
    })
  }
  })
})

// Delete Post
// DELETE /api/v1/posts/101
router.delete('/:waffles', (req, res) => {
  models.Post.destroy({
    where: {
      id: req.params.waffles
    }
  })
  .then(deleted => {
    if (deleted === 1) {
      res.status(202).json({
        success: 'Post deleted'
      })
    } else {
      res.status(404).json({
        error: 'Post not found'
      })
    }
  })
})

module.exports = router;
