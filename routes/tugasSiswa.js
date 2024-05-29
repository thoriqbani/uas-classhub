const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const tugas_model = require('../models/tugas_model'); 
const siswa_model = require('../models/siswa_model'); // Pastikan path ini benar
const pelajaran_model = require('../models/pelajaran_model');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/materi_pdf");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

router.get('/', async function(req, res, next) {
    let id = req.session.userId
    try {
      let data_user = await siswa_model.getByID(id)
      let data_mapel = await pelajaran_model.getAll()
      
      if (data_user.length > 0) {
        if (data_user[0].level_user != 'siswa') {
          res.redirect('/logout')
        } else {
          res.render('siswa/tugas', {
            pages: 'tugas',
            mapel_list: data_mapel,
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

router.get('/create/:tugas_id', async function(req, res, next) {
    let id = req.session.userId
    try {
      let data_user = await siswa_model.getByID(id)
      let data_mapel = await pelajaran_model.getAll()
      
      if (data_user.length > 0) {
        if (data_user[0].level_user != 'siswa') {
          res.redirect('/logout')
        } else {
          res.render('siswa/create_tugas', {
            pages: 'detail tugas',
            mapel_list: data_mapel,
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

router.get('/:mapelId', async function(req, res) {
  const mapel_id = req.params.mapelId
    try {
      let materi_list = await tugas_model.getByMapel(mapel_id)

        res.json(materi_list);
    } catch (error) {
        console.error(error);
        res.status(500).json('error pada fungsi');
    }
});

const upload = multer({ storage: storage });
  
  router.post('/create', upload.single('file_tugas'), async (req, res) => {
      try {
          // const { file_tugas } = req.body;
          const file_tugas = req.file.filename;
          const data = {
            file_tugas: file_tugas,
            status:'sudah',
            tanggal_pengumpulan: tanggal,
            waktu_pengumpulan: waktu,
            tugas_id: req.session.userId,
            user_id: req.session.userId,
            mapel_id,
          };
          await materi_model.store(data);
          console.log("File uploaded:", req.file.filename);
          res.redirect('/guru');
      } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
      }
  });

  module.exports = router;