const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const tugas_model = require('../models/tugas_model'); 
const siswa_model = require('../models/siswa_model'); // Pastikan path ini benar
const pelajaran_model = require('../models/pelajaran_model');
const pengumpulan_model = require('../models/pengumpulan_model');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/pengumpulanTugas_pdf");
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
    let tugas_id = req.params.tugas_id
    let id = req.session.userId
    try {
      let data_user = await siswa_model.getByID(id)
      let data_tugas = await tugas_model.getByTugasID(tugas_id)
      
      if (data_user.length > 0) {
        if (data_user[0].level_user != 'siswa') {
          res.redirect('/logout')
        } else {
          res.render('siswa/create_tugas', {
            pages: 'detail tugas',
            data_tugas: data_tugas,
            tugas_id: tugas_id,
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

router.get('/edit/:tugas_id', async function(req, res, next) {
    let tugas_id = req.params.tugas_id
    let id = req.session.userId
    try {
      let data_user = await siswa_model.getByID(id)
      let data_tugas = await tugas_model.getByTugasID(tugas_id)
      
      if (data_user.length > 0) {
        if (data_user[0].level_user != 'siswa') {
          res.redirect('/logout')
        } else {
          res.render('siswa/edit_tugas', {
            pages: 'Edit Tugas',
            data_tugas: data_tugas,
            tugas_id: tugas_id,
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
  const mapel_id = req.params.mapelId;
  const user_id = req.session.userId;
  try {
      let tugas_list = await tugas_model.getByMapel(mapel_id);
      let pengumpulan_list = await pengumpulan_model.getByUserAndMapel(user_id, mapel_id);

      // Map pengumpulan status to tugas
      let tugasWithStatus = tugas_list.map(tugas => {
          let pengumpulan = pengumpulan_list.find(p => p.tugas_id === tugas.id);
          tugas.pengumpulan_status = pengumpulan ? pengumpulan.status : null;
          return tugas;
      });

      res.json(tugasWithStatus);
  } catch (error) {
      console.error(error);
      res.status(500).json('error pada fungsi');
  }
});



const upload = multer({ storage: storage });
  
  router.post('/create', upload.single('file_tugas'), async (req, res) => {
    const file_tugas = req.file.filename;
    const { tugas_id, mapel_id } = req.body
    if(!file_tugas){
      req.flash('messageError','File Tidak ada !!')
      res.redirect('/siswa/tugas')
    }
      try {
          const today = new Date();
          const tanggal_pengumpulan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          let hours = today.getHours();
          let minutes = today.getMinutes();
          const waktu_pengumpulan = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes
          console.log(tanggal_pengumpulan)
          console.log(waktu_pengumpulan)
          const deadline = await tugas_model.getByTugasId(tugas_id)
          console.log(deadline)
          if(tanggal_pengumpulan > deadline[0].tanggal_deadline  && waktu_pengumpulan > deadline[0].waktu_deadline) {
            const data = {
              file_tugas: file_tugas,
              status:'telat',
              tanggal_pengumpulan: tanggal_pengumpulan,
              waktu_pengumpulan: waktu_pengumpulan,
              tugas_id: tugas_id,
              user_id: req.session.userId,
              mapel_id: mapel_id,
            };
            await pengumpulan_model.store(data);
            console.log("File uploaded:", req.file.filename);
            req.flash('success','Anda Telat Mengumpulkan')
          } else if (tanggal_pengumpulan == deadline[0].tanggal_deadline && tanggal_pengumpulan > deadline[0].tanggal_deadline) {
            const data = {
              file_tugas: file_tugas,
              status:'telat',
              tanggal_pengumpulan: tanggal_pengumpulan,
              waktu_pengumpulan: waktu_pengumpulan,
              tugas_id: tugas_id,
              user_id: req.session.userId,
              mapel_id: mapel_id,
            };
            await pengumpulan_model.store(data);
            console.log("File uploaded:", req.file.filename);
            req.flash('success','Anda Telat Mengumpulkan')
          } else {
            const data = {
              file_tugas: file_tugas,
              status:'sudah',
              tanggal_pengumpulan: tanggal_pengumpulan,
              waktu_pengumpulan: waktu_pengumpulan,
              tugas_id: tugas_id,
              user_id: req.session.userId,
              mapel_id: mapel_id,
            };
            await pengumpulan_model.store(data);
            console.log("File uploaded:", req.file.filename);
            req.flash('success','Anda Berhasil Mengumpulkan')
          }
          res.redirect('/siswa/tugas');
      } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
      }
  });
  
  router.post('/edit', upload.single('file_tugas'), async (req, res) => {
    const user_id = req.session.userId
    const file_tugas = req.file.filename
    const { tugas_id, mapel_id } = req.body
    if(!file_tugas){
      req.flash('messageError','File Tidak ada !!')
      res.redirect('/siswa/tugas')
    }
      try {
          const today = new Date()
          const tanggal_pengumpulan = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
          let hours = today.getHours()
          let minutes = today.getMinutes()
          const waktu_pengumpulan = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes
          const deadline = await tugas_model.getByTugasId(tugas_id)
          if(deadline[0].tanggal_deadline < tanggal_pengumpulan && deadline[0].waktu_deadline < waktu_pengumpulan) {
            const data = {
              file_tugas: file_tugas,
              status:'telat',
              tanggal_pengumpulan: tanggal_pengumpulan,
              waktu_pengumpulan: waktu_pengumpulan,
              tugas_id: tugas_id,
              user_id: req.session.userId,
              mapel_id: mapel_id,
            };
            await pengumpulan_model.update(data, user_id);
            console.log("File uploaded:", req.file.filename);
            req.flash('success','Anda Telat Mengumpulkan')
          } else {
            const data = {
              file_tugas: file_tugas,
              status:'sudah',
              tanggal_pengumpulan: tanggal_pengumpulan,
              waktu_pengumpulan: waktu_pengumpulan,
              tugas_id: tugas_id,
              user_id: req.session.userId,
              mapel_id: mapel_id,
            };
            await pengumpulan_model.update(data, user_id);
            console.log("File uploaded:", req.file.filename);
            req.flash('success','Anda Berhasil Mengumpulkan')
          }
          res.redirect('/siswa/tugas');
      } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
      }
  });

  module.exports = router;