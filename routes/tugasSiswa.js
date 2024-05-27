const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const tugas_model = require('../models/tugas_model'); 
const siswa_model = require('../models/siswa_model'); // Pastikan path ini benar
const jadwal_model = require('../models/jadwal_model');

router.get('/', async function(req, res, next) {
    let id = req.session.userId
    try {
      let data_user = await siswa_model.getByID(id)
      
      if (data_user.length > 0) {
        if (data_user[0].level_user != 'siswa') {
          res.redirect('/logout')
        } else {
          res.render('siswa/tugas', {
            pages: 'tugas',
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

  module.exports = router;