var express = require('express');
var router = express.Router();
const siswa_model = require('../models/siswa_model');
const jadwal_model = require('../models/jadwal_model');
const presensi_model = require('../models/presensi_model');

function getDayName(day) {
  const hari = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
  return hari[day];
}

router.get('/', async function(req, res, next) {
  let id = req.session.userId
  try {
    let data_user = await siswa_model.getByID(id)
    let data_harisenin = await jadwal_model.getAllByHariSenin()
    console.log(data_harisenin)
    let data_hariselasa = await jadwal_model.getAllByHariSelasa()
    let data_harirabu = await jadwal_model.getAllByHariRabu()
    let data_harikamis = await jadwal_model.getAllByHariKamis()
    let data_harijumat = await jadwal_model.getAllByHariJumat()
    let data_harisabtu = await jadwal_model.getAllByHariSabtu()
    
    if (data_user.length > 0) {
      if (data_user[0].level_user != 'siswa') {
        res.redirect('/logout')
      } else {
        res.render('siswa/dashboard', {
          pages: 'dashboard',
          dataSenin: data_harisenin,
          dataSelasa: data_hariselasa,
          dataRabu: data_harirabu,
          dataKamis: data_harikamis,
          dataJumat: data_harijumat,
          dataSabtu: data_harisabtu,
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

router.get('/detail/(:mapelID)', async function(req, res, next) {
  let mapelID = req.params.mapelID
  let id = req.session.userId
  try {
    let data_user = await siswa_model.getByID(id)
    let data_mapel = await jadwal_model.getByID(mapelID)
    let dataPresensi = await presensi_model.getPresensi(id)
    console.log(data_mapel)
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    const waktu = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes
    console.log(waktu)
    let hariini = getDayName(today.getDay())
    console.log(hariini)
    if (data_user.length > 0) {
      if (data_user[0].level_user != 'siswa') {
        res.redirect('/logout')
      } else {
        res.render('siswa/detail', {
          pages: 'detail',
          dataPresensi: dataPresensi,
          dataMapel: data_mapel,
          hariIni: hariini,
          jamSekarang: waktu,
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



module.exports = router;