const express = require('express');

const db = require('../data/db.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts); 
  } catch(err) {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
})

router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await db.findById(postId);
    
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  } catch(err) {
    res.status(500).json({ error: "The post information could not be retrieved." });
  }
})

module.exports = router;