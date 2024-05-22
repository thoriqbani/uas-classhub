const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const siswa_model = require('../models/siswa_model');
const jadwal_model = require('../models/jadwal_model');

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

router.get('/',  async function(req, res, next) {
    let id = req.session.userId
    try {
    let data_user = await siswa_model.getByID(id)
      
    if (data_user.length > 0) {
        if (data_user[0].level_user != 'siswa') {
            res.redirect('/logout')
        } else {
            res.render('siswa/editProfile', {
                pages: 'Edit Profile',
                nama: data_user[0].nama,
                jenis_kelamin: data_user[0].jenis_kelamin,
                tanggal_lahir: data_user[0].tanggal_lahir,
                no_hp: data_user[0].no_hp,
                level_user: data_user[0].level_user,
                photos: data_user[0].photos,
                email: data_user[0].email,
            })
        }
        } else {
            res.status(401).json({error: 'user tidak ada'})  
        }
    } catch (error) {
        console.error(error)
        res.status(501).json('error pada fungsi')
    }
});

router.post('/', upload.single("photos"), async function(req, res){
    let id = req.session.userId
    let { nama, jenis_kelamin, tanggal_lahir, no_hp, email, password } = req.body;
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
    let cek = siswa_model.Update(id, data);
    if (cek) {
      req.flash('success', 'Berhasil Update !!');
      res.redirect('/siswa/editProfile');
    } else {
      req.flash('error', 'Gagal Update !!');
      res.redirect('/siswa/editProfile');
    }
  } catch (error) {
    console.error(error)
    req.flash('error', 'Error pada fungsi !!')
    res.redirect('/editProfile')
  }
})

module.exports = router;