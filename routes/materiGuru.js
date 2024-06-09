const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const guru_model = require("../models/guru_model");
const materi_model = require("../models/materi_model");
const jadwal_model = require("../models/jadwal_model");

// function getDayName(day) {
//   const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
//   return hari[day];
// }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/materi_pdf");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

router.get("/", async function (req, res, next) {
  let userId = req.session.userId;
  try {
    let data_user = await guru_model.getByID(userId);
    let dataMapel = await jadwal_model.getByUserID(userId);
    console.log(dataMapel);
    if (data_user.length > 0) {
      if (data_user[0].level_user != "guru") {
        res.redirect("/logout");
      } else {
        res.render("guru/create_materi", {
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
  } catch (error) {
    console.error(error);
    res.status(501).json("error pada fungsi");
  }
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("file_tugas"), async (req, res) => {
  try {
    const { judul, deskripsi, mapel_id } = req.body;
    const file_tugas = req.file.filename;
    const data = {
      judul,
      deskripsi,
      file_materi: file_tugas,
      status: "complete",
      user_id: req.session.userId,
      mapel_id,
    };
    await materi_model.store(data);
    console.log("File uploaded:", req.file.filename);
    req.flash('success','Create Materi Berhasil !!')
    res.redirect("/guru");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
