const express = require("express");
const router = express.Router();
const Manga = require("../models/Manga");

router.post("/add", async (req, res) => {
  try {
    const manga = new Manga(req.body);
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
