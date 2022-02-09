const express = require("express");
const router = express.Router();
const ariza = require("../../models/ariza/ariza");
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

router.post("/add", upload.single("file"), async (req, res, next) => {
  const result = new ariza({
    file: `${req.file.filename}`,
    universitet: req.body.universitet,
    yonalish: req.body.yonalish,
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
      res.json({ data: error });
    });
});
router.get("/all", async (req, res, next) => {
  const result = await ariza.find().populate('universitet').populate('yonalish')
  res.json({
    data: result
  });
});
// bitta universitetni id si boyicha hamma arizalarni olish
router.get("/:id", async (req, res, next) => {
  const result = await ariza.find({ universitet: req.params.id }).populate('universitet').populate('yonalish')
  res.json({
    message: "Success",
    data: result,
  });
});
router.get("/filter/:id", async (req, res, next) => {
  const result = await ariza.find(req.params.id)
  result.status = "Tekshirilgan"
  result.save()
  result
    .save()
    .then(() => {
      res.json({
        message: "Success",
        data: result,
      });
    })
    .catch((error) => {
      res.json({ data: error });
    });
});
router.put("/:id", async (req, res, next) => {
  const result = await ariza.findByIdAndUpdate(req.params.id)
  result.status = "Tekshirilmagan"
  result.save()
  result
    .save()
    .then(() => {
      res.json({
        message: "Success",
        data: result,
      });
    })
    .catch((error) => {
      res.json({ data: error });
    });
});
router.delete("/:id", async (req, res, next) => {
  await ariza.findById({ _id: req.params.id }).exec(async (error, data) => {
    if (error) {
      res.send(error);
    } else {
      const filePath = path.join(__dirname, "../public/uploads/" + data.video);
      fs.unlink(filePath, async (err) => {
        console.log("Deleted video")
      });
      await ariza.findByIdAndDelete({ _id: req.params.id });
      res.json({
        message: "Success",
        data: [],
      });
    }
  });
});





module.exports = router;
