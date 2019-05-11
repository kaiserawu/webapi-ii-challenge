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

router.post('/', async (req, res) => {
  try {
    const postData = req.body;
    if (postData.title && postData.contents) {
      const saved = await db.insert(postData);
      res.status(201).json(saved);
    } else {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
  } catch {
    res.status(500).json({ error: "There was an error while saving the post to the database" });
  }
})

module.exports = router;