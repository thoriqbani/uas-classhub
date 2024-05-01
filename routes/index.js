const express = require('express');
const bcrypt = require('bcrypt');
const siswa_model = require('../models/siswa_model');
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('home');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', async function(req, res) {
  let { nama, jenis_kelamin, tanggal_lahir, nama_orangtua, pekerjaan_orangtua, no_hp, email, password, confirmPassword } = req.body;
  try {
    if (!/^[0-9a-zA-Z]+$/.test(password)) {
      req.flash('messageError', 'Password harus terdiri dari angka dan huruf saja');
      return res.redirect('/register');
    }
  
    if (password.length < 8) {
      req.flash('messageError', 'Password harus terdiri dari minimal 8 karakter');
      return res.redirect('/register');
    }
    
    if (password !== confirmPassword) {
      req.flash('messageError', 'Konfirmasi password tidak cocok');
      return res.redirect('/register');
    }
    
    let enskripsi = await bcrypt.hash(password, 10);
    let data = {
      nama,
      jenis_kelamin,
      tanggal_lahir,
      nama_orangtua,
      pekerjaan_orangtua,
      no_hp,
      photos: req.file.filename,
      email,
      password: enskripsi,
      level_user: 'siswa'
    };
    let cek = siswa_model.Store(data);
    if (cek) {
      req.flash('success', 'Berhasil menyimpan');
      res.redirect('/login');
    } else {
      req.flash('error', 'Gagal menyimpan');
      res.redirect('/register');
    }
  } catch (error) {
    console.error(error)
    req.flash('error', 'Error pada fungsi')
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
          res.redirect('/guru ')
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

module.exports = router;