const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const admin_model = require("../models/admin_model");
const guru_model = require("../models/guru_model");
const siswa_model = require("../models/siswa_model");
const jadwal_model = require("../models/jadwal_model");
const tugas_model = require("../models/tugas_model");
const materi_model = require("../models/materi_model");
const pelajaran_model = require("../models/pelajaran_model");
const presensi_model = require("../models/presensi_model");

function getDayName(day) {
  const hari = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
  return hari[day];
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/foto_user");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    let userId = req.session.userId;
    let data_user = await admin_model.getByID(userId);
    let data_guru = await guru_model.getByLevelUser();
    let data_siswa = await siswa_model.getByLevelUser();
    let tugasList = await tugas_model.getAllByUserId(userId);
    let materiList = await materi_model.getAllByUserId(userId);
    // const tanggal = tugasList.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    if (data_user.length > 0) {
      if (data_user[0].level_user != "admin") {
        res.redirect("/logout");
      } else {
        res.render("admin/lihat_user", {
          tugasList: tugasList,
          materiList: materiList,
          data_guru: data_guru,
          data_siswa: data_siswa,
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

router.get("/detail/(:jadwalId)", async function (req, res, next) {
  let jadwalID = req.params.jadwalId;
  let id = req.session.userId;
  try {
    let data_user = await admin_model.getByID(id);
    let data_mapel = await jadwal_model.getById(jadwalID);
    let user_list = await guru_model.getAll();
    let pelajaran_list = await pelajaran_model.getAll();
    let tugas_list = await tugas_model.getAllByUserId(id)
    // let dataPresensi = await presensi_model.getPresensiByPresensiAndUserId(
    //   data_mapel[0].mapel_id,
    //   id
    // );

    // let dataPresensi = await presensi_model.getPresensiByPresensiId(id)
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    const waktu =
      (hours < 10 ? "0" : "") +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes;

    let hariini = getDayName(today.getDay());
    console.log(hariini);
    if (data_user.length > 0) {
      if (data_user[0].level_user != "admin") {
        res.redirect("/logout");
      } else {
        res.render("admin/detail_jadwal", {
          pages: "detail",
          //   dataPresensi: dataPresensi,
          dataMapel: data_mapel,
          hariIni: hariini,
          user_list: user_list,
          tugas_list: tugas_list,
          pelajaran_list: pelajaran_list,
          jamSekarang: waktu,
          nama: data_user[0].nama,
          photos: data_user[0].photos,
          email: data_user[0].email,
          level_user: data_user[0].level_user,
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

router.post("/detail/update/(:jadwalID)", async (req, res) => {
  let { jadwalID } = req.params;

  try {
    const { hari, jam_awal, jam_akhir, user_id, mapel_id } = req.body;

    const data = {
      hari,
      jam_awal,
      jam_akhir,
      user_id,
      mapel_id,
    };

    await jadwal_model.update(data, jadwalID);
    req.flash("success", "Update Jadwal Berhasil !!");
    res.redirect("/admin");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/delete/(:userID)", async (req, res) => {
  let { userID } = req.params;
  try {
    await guru_model.delete(userID);
    req.flash("success", "Delete User Berhasil !!");
    res.redirect("/admin/lihatUser");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
