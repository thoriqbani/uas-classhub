const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const guru_model = require('../models/guru_model');
const tugas_model = require('../models/tugas_model');
const materi_model = require('../models/materi_model');

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
        let materiList = await materi_model.getAllByUserId(userId);
        // const tanggal = tugasList.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if (data_user.length > 0) {
            if (data_user[0].level_user != 'guru') {
                res.redirect('/logout');
            } else {
                res.render('guru/dashboard', {
                    pages: 'dashboard',
                    tugasList: tugasList,
                    materiList: materiList,
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



module.exports = router;
