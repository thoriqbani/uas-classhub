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

router.get("/updateGuru/(:userID)", async function (req, res, next) {
  let id = req.params.userID;
  console.log(id)
  let userId = req.session.userId;
  console.log(userId)
  try {
    let data_user = await admin_model.getByID(userId); //buat admin
    let user_list = await guru_model.getByID(id);
    
    if (data_user.length > 0) {
      if (data_user[0].level_user != "admin") {
        res.redirect("/logout");
      } else {
        res.render("admin/update_userGuru", {
          pages: "detail",
          data_user: data_user,
          id: id,
          nama: user_list[0].nama,
          jenis_kelamin: user_list[0].jenis_kelamin,
          no_hp: user_list[0].no_hp,
          tanggal_lahir: user_list[0].tanggal_lahir,
          photos: user_list[0].photos,
          email: user_list[0].email,
          level_user: user_list[0].level_user,
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

router.get("/updateSiswa/(:userID)", async function (req, res, next) {
  let id = req.params.userID;
  console.log(id)
  let userId = req.session.userId;
  console.log(userId)
  try {
    let data_user = await admin_model.getByID(userId); //buat admin
    let user_list = await guru_model.getByID(id);
    
    if (data_user.length > 0) {
      if (data_user[0].level_user != "admin") {
        res.redirect("/logout");
      } else {
        res.render("admin/update_userSiswa", {
          pages: "detail",
          data_user: data_user,
          id: id,
          nama: user_list[0].nama,
          jenis_kelamin: user_list[0].jenis_kelamin,
          no_hp: user_list[0].no_hp,
          tanggal_lahir: user_list[0].tanggal_lahir,
          photos: user_list[0].photos,
          email: user_list[0].email,
          level_user: user_list[0].level_user,
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

router.post('/register', upload.single("photos"), async function(req, res) {
  let { nama, jenis_kelamin, tanggal_lahir, no_hp, email, password, confirmPassword, level_user } = req.body;
  try {
    let today = new Date();
    let birthDate = new Date(tanggal_lahir);
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 12) {
      req.flash('messageError', ' Umur harus 12 tahun keatas !!');
      return res.redirect('/register');
    }

    let cekEmailSiswa = await siswa_model.getByEmail(email)

    if(cekEmailSiswa.length > 0) {
      req.flash('messageError', 'Email sudah ada !!');
      return res.redirect('/register');
    }
    
    if (password.length < 8) {
      req.flash('messageError', ' Password harus terdiri dari minimal 8 karakter !!');
      return res.redirect('/register');
    }

    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      req.flash('messageError', ' Password harus terdiri dari angka dan huruf saja !!');
      return res.redirect('/register');
    }
    
    if (password !== confirmPassword) {
      req.flash('messageError', ' Konfirmasi password tidak cocok !!');
      return res.redirect('/register');
    }
    
    let enskripsi = await bcrypt.hash(password, 10);
    let data = {
      nama,
      jenis_kelamin,
      tanggal_lahir,
      no_hp,
      photos: req.file.filename,
      email,
      password: enskripsi,
      level_user: level_user
    }

    let cek = siswa_model.Store(data);
    if (cek) {
      req.flash('success', 'Berhasil menyimpan !!');
      res.redirect('/admin/lihatUser');
    } else {
      req.flash('error', 'Gagal menyimpan !!');
      res.redirect('/admin/lihatUser');
    }
  } catch (error) {
    console.error(error)
    req.flash('error', 'Error pada fungsi !!')
    res.redirect('/admin/lihatUser')
  }
});

module.exports = router;
