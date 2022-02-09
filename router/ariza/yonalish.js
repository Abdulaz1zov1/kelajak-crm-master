const express = require("express");
const router = express.Router();
const yonalish = require("../../models/ariza/yonalish");

router.post("/add", async (req, res, next) => {
  const result = new yonalish({
    name: req.body.name,
    description: req.body.description,
    universitet: req.body.universitet,
    
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
  const result = await yonalish.find().sort({ date: -1 });
  res.json(result);
});
router.get("/:id", async (req, res, next) => {
  const result = await yonalish.findById(req.params.id);
  res.json(result);
});

// bitta universitetga oid hamma yonalishlarni olish
router.get("/filter/:id", async (req, res, next) => {
  const result = await yonalish.find({universitet: req.params.id});
  res.json(result);
});
router.delete("/:id", async (req, res, next) => {
  await yonalish.findByIdAndDelete({ _id: req.params.id });
  res.json({
    message: "Success",
    data: [],
  });
});

module.exports = router;
