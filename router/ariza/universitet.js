const express = require("express");
const router = express.Router();
const universitet = require("../../models/ariza/universitet");
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const fs = require("fs"); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`); 
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("video"), async (req, res, next) => {
  const result = new universitet({
    name: req.body.name,
    description: req.body.description,
    video: `${req.file.filename}`,
    country: req.body.country,
  });
  result
    .save()
    .then(() => {
      res.json({
        message: "Success",
        data: result,
      });
    })
    .catch((error) => {
      res.json({
        message: "Error",
        data: error,
      });
    });
});
router.get("/all", async (req, res, next) => {
  const result = await universitet.find().populate(['country']).sort({ date: -1 });
  res.json(result);
});
router.get("/:id", async (req, res, next) => { 
  const result = await universitet.findById(req.params.id).populate(['country'])
  res.json(result); 
});
// Bitta mamalakatga oid hamma univesitetlarni olish
router.get("/filter/:id", async (req, res, next) => {
  const result = await universitet.find({country: req.params.id}).populate(['country'])
  res.json(result);
});
router.delete("/:id", async (req, res, next) => {
  await universitet.findById({ _id: req.params.id }).exec(async (error, data) => {
    if (error) {
      res.send(error);
    } else {
      const filePath = path.join(__dirname, "../public/uploads/" + data.video);
      fs.unlink(filePath, async (err) => {
        console.log("Deleted video")
      });
      await universitet.findByIdAndDelete({ _id: req.params.id });
      res.json({
        message: "Success",
        data: [],
      });
    }
  });
});

module.exports = router;
