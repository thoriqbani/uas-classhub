const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const guru_model = require('../models/guru_model');
const tugas_model = require('../models/tugas_model');

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

router.get('/', async (req, res) => {
    try {
        let userId = req.session.userId;
        let data_user = await guru_model.getByID(userId);
        let tugasList = await tugas_model.getAllByUserId(userId);
        // const tanggal = tugasList.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if (data_user.length > 0) {
            if (data_user[0].level_user != 'guru') {
                res.redirect('/logout');
            } else {
                res.render('guru/dashboard', {
                    tugasList: tugasList,
                    nama: data_user[0].nama,
                    level_user: data_user[0].level_user,
                    photos: data_user[0].photos,
                    email: data_user[0].email
                });
            }
        } else {
            res.status(401).json({ error: 'user tidak ada' });
        }
    } catch (error) {
        console.error(error);
        res.status(501).json('error pada fungsi');
    }
});

router.get('/editProfile',  async function(req, res, next) {
    let id = req.session.userId
    try {
    let data_user = await guru_model.getByID(id)
      
    if (data_user.length > 0) {
        if (data_user[0].level_user != 'guru') {
            res.redirect('/logout')
        } else {
            res.render('guru/editProfile', {
                pages: 'Edit Profile',
                nama: data_user[0].nama,
                level_user: data_user[0].level_user,
                photos: data_user[0].photos,
                email: data_user[0].email
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

router.post('/editProfile', upload.single("photos"), async function(req, res){
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
    
    if (age < 30) {
      req.flash('messageError', ' Umur harus 30 tahun keatas !!');
      return res.redirect('/guru/editProfile');
    }

    let cekEmailGuru = await guru_model.getByEmail(email)

    if(cekEmailGuru.length > 0) {
      req.flash('messageError', 'Email sudah ada !!');
      return res.redirect('/guru/editProfile');
    }
    
    if (password.length < 8) {
      req.flash('messageError', ' Password harus terdiri dari minimal 8 karakter !!');
      return res.redirect('/guru/editProfile');
    }

    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      req.flash('messageError', ' Password harus terdiri dari angka dan huruf saja !!');
      return res.redirect('/guru/editProfile');
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
      level_user: 'guru'
    };
    let cek = guru_model.Update(id, data);
    if (cek) {
      req.flash('success', 'Berhasil Update !!');
      res.redirect('/guru/editProfile');
    } else {
      req.flash('error', 'Gagal Update !!');
      res.redirect('/guru/editProfile');
    }
  } catch (error) {
    console.error(error)
    req.flash('error', 'Error pada fungsi !!')
    res.redirect('/guru/editProfile')
  }
})

module.exports = router;
