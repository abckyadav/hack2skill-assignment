const axios = require("axios");
const VideoModel = require("../Models/videoModel");
require("dotenv").config();

const fetchVideos = async () => {
  try {
    const tag = "cricket";
    const apiKey = process.env.YoutubeApiKey;

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: apiKey,
          q: tag,
          order: "date",
          type: "video",
          part: "snippet",
          maxResults: 20,
        },
      }
    );

    const videosData = response.data.items.map((item) => {
      return {
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description,
      };
    });

    await VideoModel.insertMany(videosData);
  } catch (error) {
    console.error("error", error.message);
  }
};

const interval = setInterval(fetchVideos, 10000);

const getVideos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  try {
    const totalCount = await VideoModel.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const videos = await VideoModel.find()
      .sort({ publishedAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    return res.status(200).json({
      videos,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error("error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const searchVideos = async (req, res) => {
  const query = req.query.query;

  try {
    const videosData = await VideoModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json(videosData);
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getVideos, searchVideos };
