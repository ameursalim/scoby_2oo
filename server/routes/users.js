const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/me", function (req, res, next) {
  res.send("respond with a resource");
});

router.patch("/me/:id", (req, res, next) => {
  const updateValues = req.body;
  User.findByIdAndUpdate(req.params.id, updateValues, { new: true })
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
