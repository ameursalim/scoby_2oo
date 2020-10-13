const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const uploader = require("../config/cloudinary");

router.get("/", (req, res, next) => {
  Item.find()
    .then((dbResponse) => {
      res.status(200).json(dbResponse);
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.status(500).json(dbErr);
    });
});

router.get("/:id", (req, res, next) => {
  Item.findById(req.params.id)
    .then((dbResponse) => {
      res.status(200).json(dbResponse);
    })
    .catch((dbErr) => {
      console.log(dbErr);
      res.status(500).json(dbErr);
    });
});

// Route is prefixed with /friends
router.post("/", uploader.single("image"), (req, res, next) => {
  console.log("totototototoot");
  const newItem = req.body;

  if (req.file) {
    newItem.profileImage = req.file.path;
  }

  Item.create(newItem)
    .then((ItemDocument) => {
      res.status(201).json(ItemDocument);
    })
    .catch((error) => {
      res.status(500).json(dbErr);
    });
});

// Route is prefixed with /friends
router.patch("/:id", (req, res, next) => {
  const updateValues = req.body;
  Item.findByIdAndUpdate(req.params.id, updateValues, { new: true })
    .then((ItemDocument) => {
      res.status(200).json(ItemDocument);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res, next) => {
  Item.findByIdAndRemove(req.params.id)
    .then((deletedDocument) => {
      res.sendStatus(204);
    })
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
