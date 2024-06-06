const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const tugas_model = require("../models/tugas_model");
const guru_model = require("../models/guru_model"); // Pastikan path ini benar
const jadwal_model = require("../models/jadwal_model");

// Konfigurasi penyimpanan untuk multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/tugas_pdf");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

router.get("/", async function (req, res) {
  let userId = req.session.userId;
  let data_user = await guru_model.getByID(userId);
  console.log(data_user);
  let dataMapel = await jadwal_model.getByUserID(userId);
  console.log(dataMapel);

  if (data_user.length > 0) {
    if (data_user[0].level_user != "guru") {
      res.redirect("/logout");
    } else {
      res.render("guru/create_tugas", {
        pages: "tugas",
        dataMapel: dataMapel,
        nama: data_user[0].nama,
        level_user: data_user[0].level_user,
        photos: data_user[0].photos,
        email: data_user[0].email,
      });
    }
  } else {
    res.status(401).json({ error: "user tidak ada" });
  }
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("file_tugas"), async (req, res) => {
  try {
    const { judul, deskripsi, mapel_id, tanggal_deadline, waktu_deadline } =
      req.body;
    const file_tugas = req.file.filename;
    // const today = new Date();
    // const tanggal_deadline = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // const waktu_deadline = today.getHours() + ':' + today.getMinutes();
    const data = {
      judul,
      deskripsi,
      file_tugas,
      tanggal_deadline: tanggal_deadline,
      waktu_deadline: waktu_deadline,
      user_id: req.session.userId,
      mapel_id,
    };
    await tugas_model.store(data);
    console.log("File uploaded:", req.file.filename);
    req.flash("success", "Create Tugas Berhasil !!");
    res.redirect("/guru");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
