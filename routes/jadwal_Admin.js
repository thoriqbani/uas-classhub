const express = require('express');
const router = express.Router();
const jadwal_model = require('../models/jadwal_model');
const admin_model = require('../models/admin_model');
const guru_model = require('../models/guru_model');
const tugas_model = require('../models/tugas_model');
const materi_model = require('../models/materi_model');
const pelajaran_model = require('../models/pelajaran_model');

router.get('/', async (req, res) => {
    try {
        let userId = req.session.userId;
        let data_user = await admin_model.getByID(userId);
        let tugasList = await tugas_model.getAllByUserId(userId);
        let materiList = await materi_model.getAllByUserId(userId);
        let user_list = await guru_model.getAll()
        let pelajaran_list = await pelajaran_model.getAll()
        // const tanggal = tugasList.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if (data_user.length > 0) {
            if (data_user[0].level_user != 'admin') {
                res.redirect('/logout');
            } else {
                res.render('admin/create_jadwal', {
                    pages: 'jadwal',
                    user_list: user_list,
                    pelajaran_list: pelajaran_list,
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

// CREATE: Add a new jadwal
router.post('/create', async (req, res) => {
    try {
        const { hari, jam_awal, jam_akhir, user_id, mapel_id } = req.body;
        let existingJadwal = await jadwal_model.getByHari(hari);

        // Check if there's a conflict in the schedule
        const isConflict = existingJadwal.some(jadwal => {
            return (
                (jam_awal >= jadwal.jam_awal && jam_awal < jadwal.jam_akhir) ||
                (jam_akhir > jadwal.jam_awal && jam_akhir <= jadwal.jam_akhir) ||
                (jadwal.jam_awal >= jam_awal && jadwal.jam_awal < jam_akhir) ||
                (jadwal.jam_akhir > jam_awal && jadwal.jam_akhir <= jam_akhir)
            );
        });

        if (isConflict) {
            req.flash('messageError', 'Jadwal bertabrakan dengan jadwal lain pada hari yang sama.');
            res.redirect('/admin/jadwal');
        } else {
            const data = {
                hari,
                jam_awal,
                jam_akhir,
                user_id,
                mapel_id
            };
            await jadwal_model.store(data);
            req.flash('success', 'Create Jadwal Berhasil !!');
            res.redirect('/admin/jadwal');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// UPDATE: Update an existing jadwal
router.put('/:id', async (req, res) => {
    try {
        const jadwalId = req.params.id;
        const { hari, jam_awal, jam_akhir, user_id, mapel_id } = req.body;
        await jadwal_model.updateJadwal(jadwalId, hari, jam_awal, jam_akhir, user_id, mapel_id);
        res.json({ message: 'Jadwal updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE: Delete an existing jadwal
router.delete('/:id', async (req, res) => {
    try {
        const jadwalId = req.params.id;
        await jadwal_model.deleteJadwal(jadwalId);
        res.json({ message: 'Jadwal deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
