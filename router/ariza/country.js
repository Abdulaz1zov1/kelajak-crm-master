const express = require("express");
const router = express.Router();
const davlat = require("../../models/ariza/country");
const path = require('path');
const md5 = require('md5');
const multer = require('multer'); 


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public/uploads/country')
  },
  filename: function (req, file, cb) {
      cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
  }
});

const upload = multer({storage: storage});

router.post("/add", upload.single('image'), async (req, res, next) => {
  const result = new davlat({
    image: `${req.file.filename}`,
    name: req.body.name,
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
  const result = await davlat.find().sort({ date: -1 });
  res.json(result);
}); 
router.get("/:id", async (req, res, next) => {
  const result = await davlat.findById(req.params.id)
  res.json({
    data: result
  }); 
});
router.delete("/:id", async (req, res, next) => {
  await davlat.findByIdAndDelete({ _id: req.params.id });
  res.json({
    message: "Success",
    data: [],
  });
});

module.exports = router;
