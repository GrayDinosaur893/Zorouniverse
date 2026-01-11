const express = require("express");
const router = express.Router();
const Manga = require("../models/Manga");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post("/add", upload.single("coverImage"), async (req, res) => {
  try {
    const manga = new Manga({
      title: req.body.title,
      author: req.body.author,
      chapters: req.body.chapters,
      coverImage: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await manga.save();
    res.status(201).json(manga);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  const mangas = await Manga.find();
  res.json(mangas);
});

router.get("/:id", async (req, res) => {
  const manga = await Manga.findById(req.params.id);
  if (!manga) return res.status(404).json({ message: "Not found" });
  res.json(manga);
});

router.put("/:id", async (req, res) => {
  const updated = await Manga.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Manga.findByIdAndDelete(req.params.id);
  res.json({ message: "Manga deleted" });
});

module.exports = router;
