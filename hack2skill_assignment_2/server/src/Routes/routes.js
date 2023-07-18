const express = require("express");
const { getVideos, searchVideos } = require("../Controller/videoController");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json("Hack2Skill Assignment 2");
});

router.get("/search", searchVideos);
router.get("/videos", getVideos);

module.exports = router;
