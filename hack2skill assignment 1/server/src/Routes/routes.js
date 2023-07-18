const express = require("express");
const userModel = require("../Models/userModel");
const teamModel = require("../Models/teamModel");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json("Hack2Skill Assignment 1");
});

router.get("/fetchdata", async (req, res) => {
  try {
    const finalData = await userModel.aggregate([
      {
        $lookup: {
          from: "teams",
          localField: "email",
          foreignField: "email",
          as: "finalData",
        },
      },
      {
        $project: {
          team_name: { $arrayElemAt: ["$finalData.team_name", 0] },
          _id: 1,
          full_name: 1,
          email: 1,
          number: 1,
          city: 1,
          url: 1,
        },
      },
    ]);

    return res.status(200).json(finalData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
