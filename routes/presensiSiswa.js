var express = require('express');
var router = express.Router();
const siswa_model = require('../models/siswa_model');
const jadwal_model = require('../models/jadwal_model');
const presensi_model = require('../models/presensi_model');

router.get('/', async function(req, res, next) {
    let id = req.session.userId
    
    try {
      let data_user = await siswa_model.getByID(id)
      
      if (data_user.length > 0) {
        if (data_user[0].level_user != 'siswa') {
          res.redirect('/logout')
        } else {
          res.render('siswa/presensi', {
            pages: 'presensi',
            nama: data_user[0].nama,
            photos: data_user[0].photos,
            email: data_user[0].email,
            level_user: data_user[0].level_user,
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

router.post('/presensi', async function(req, res) {
  try {
    const user_id = req.session.userId
    const today = new Date()
    const { mapel_id } = req.body
    const tanggal = today.getFullYear()+'-'+(today.getMonth() + 1)+'-'+today.getDate();
    const waktu = today.getHours()+':'+today.getMinutes();
    const cek = await presensi_model.getPresensi(user_id, tanggal, mapel_id);

    // Jika sudah absen
    if (cek.length > 0) {
      req.flash('messageError', 'Anda sudah absen untuk jam ini, silahkan tunggu jam berikutnya !!');
      res.redirect('/siswa');
    } else {
      const data = {
        tanggal_presensi: tanggal,
        jam_presensi: waktu,
        status: 'Sudah',
        user_id: user_id,
        mapel_id: mapel_id
      };
      
      const save = await presensi_model.Store(data);

      if (save) {
        req.flash('success', 'Anda berhasil absen !!');
        res.redirect('/siswa');
      } else {
        req.flash('error', 'Anda gagal absen !!');
        res.redirect('/siswa');
      }
    }
    res.redirect('/siswa');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Terjadi kesalahan saat menyimpan data presensi');
  }
});

  

module.exports = router;