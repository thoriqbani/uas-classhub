const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const siswa_model = require('../models/siswa_model');

// function getDayName(day) {
//   const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
//   return hari[day];
// }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/foto_user");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage:storage})

router.get('/', async function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.get('/register', function(req, res, next) {
  res.render('auth/register');
});


router.post('/register', upload.single("photos"), async function(req, res) {
  let { nama, jenis_kelamin, tanggal_lahir, no_hp, email, password, confirmPassword } = req.body;
  try {
    let today = new Date();
    let birthDate = new Date(tanggal_lahir);
    const hariini = today.getDay()
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 6) {
      req.flash('messageError', ' Umur harus 6 tahun keatas !!');
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
      level_user: 'siswa'
    };
    let cek = siswa_model.Store(data);
    if (cek) {
      req.flash('success', 'Berhasil menyimpan !!');
      res.redirect('/login');
    } else {
      req.flash('error', 'Gagal menyimpan !!');
      res.redirect('/register');
    }
  } catch (error) {
    console.error(error)
    req.flash('error', 'Error pada fungsi !!')
    res.redirect('/register')
  }
});

router.post('/login', async function(req, res) {
  let { email, password } = req.body
  try {
    let data = await siswa_model.login(email)
    if (data.length > 0) {
      let enkripsi = data[0].password
      let cek = await bcrypt.compare(password, enkripsi)
      if (cek) {
        req.session.userId = data[0].id
        if (data[0].level_user == 'siswa') {
          res.redirect('/siswa')
        } else if(data[0].level_user == 'guru') {
          res.redirect('/guru')
        } else {
          req.flash('error', 'gagal')
          res.redirect('/login')
        }
      } else {
        req.flash('error', 'Password salah')
        res.redirect('/login')
      }
    } else {
      req.flash('error', 'Email salah / Akun tidak ditemukan')
      res.redirect('/login')
    }
  } catch (error) {
    console.error(error)
    req.flash('error', 'Error pada fungsi')
    res.redirect('/login')
  }
})

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.error(err)
    } else {
      res.redirect('/login')
    }
  })
})

module.exports = router;