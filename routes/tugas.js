const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Diperlukan untuk memeriksa apakah file ada

const tugas_model = require('../models/tugas_model'); // Pastikan path ini benar

// Konfigurasi penyimpanan untuk multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/upload/tugas_pdf");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});



const upload = multer({ storage: storage });

// Route untuk menangani unggah file dan membuat tugas baru
router.post('/create', upload.single('file_tugas'), async (req, res) => {
    try {
        const { judul, deskripsi, mapel_id } = req.body;
        const file_tugas = req.file.filename;
        const data = {
            judul,
            deskripsi,
            file_tugas,
            mapel_id,
            user_id: req.session.userId
        };
        await tugas_model.store(data);
        console.log("File uploaded:", req.file.filename); // Log untuk memastikan file diunggah dengan benar
        res.redirect('/guru');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/create', (req, res) => {
    res.render('guru/create_tugas'); // Pastikan view ini ada
});

router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../public/upload/tugas_pdf', filename);
    console.log("Attempting to download file:", filepath); // Log untuk memastikan path benar
    res.download(filepath, filename, (err) => {
        if (err) {
            console.error("Error downloading file:", err);
            res.status(404).send('File not found');
        }
    });
});

module.exports = router;
