const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const siswa_model = require('../models/siswa_model');
const jadwal_model = require('../models/jadwal_model');

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
    let id = req.session.userId
    try {
      let data_user = await siswa_model.getByID(id)
      
      if (data_user.length > 0) {
        if (data_user[0].level_user != 'siswa') {
          res.redirect('/logout')
        } else {
          res.render('siswa/materi', {
            pages: 'Materi',
            nama: data_user[0].nama,
            level: data_user[0].level_user,
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

module.exports = router;