const express = require('express');
const router = express.Router();
const guru_model = require('../models/guru_model');
const tugas_model = require('../models/tugas_model');

router.get('/', async (req, res) => {
    try {
        let userId = req.session.userId;
        let data_user = await guru_model.getByID(userId);
        let tugasList = await tugas_model.getAllByUserId(userId);

        if (data_user.length > 0) {
            if (data_user[0].level_user != 'guru') {
                res.redirect('/logout');
            } else {
                res.render('guru/dashboard', {
                    tugasList: tugasList,
                    pages: 'Dashboard Guru',
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

router.get('/', async (req, res) => {
    try {
        const tugasList = await tugas_model.getAllByUserId(req.session.userId);
        const nama = req.session.nama;
        res.render('guru/dashboard', { tugasList, nama });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
