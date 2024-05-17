const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const guru_model = require('../models/guru_model');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/upload/tugas_pdf");
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
    },
});

router.get('/', async function(req, res, next) {
    let id = req.session.userId
    try {
        let data_user = await guru_model.getByID(id)

        if (data_user.length > 0) {
            if (data_user[0].level_user != 'guru') {
                res.redirect('/logout')
            } else {
                res.render('guru/dashboard', {
                    pages: 'Dashboard',
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