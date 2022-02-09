const express = require("express");
const router = express.Router();
const video = require("../../models/ariza/video");
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const fs = require("fs"); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/video");
  },
  filename: function (req, file, cb) {
    cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`); 
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("video"), async (req, res, next) => {
  const result = new video({
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
  const result = await video.find().populate(['country']).sort({ date: -1 });
  res.json(result);
});
router.get("/:id", async (req, res, next) => { 
  const result = await video.findById(req.params.id).populate(['country'])
  res.json(result); 
});
// Bitta mamalakatga oid hamma univesitetlarni olish

router.delete("/:id", async (req, res, next) => {
  await video.findById({ _id: req.params.id }).exec(async (error, data) => {
    if (error) {
      res.send(error);
    } else {
      const filePath = path.join(__dirname, "../public/uploads/video" + data.video);
      fs.unlink(filePath, async (err) => {
        console.log("Deleted video")
      });
      await video.findByIdAndDelete({ _id: req.params.id });
      res.json({
        message: "Success",
        data: [],
      });
    }
  });
});

module.exports = router;
