const connect = require('../config/db.js');

class tugas_model {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM tugas ORDER BY id DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getByUserID(user_id) {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM tugas WHERE user_id = ? ORDER BY id DESC', [user_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    static async getAllByUserId(userId) {
        return new Promise((resolve, reject) => {
            connect.query('SELECT DATE_FORMAT(tanggal_deadline, "%d-%m-%Y") AS tanggal_deadline, waktu_deadline, judul, deskripsi, file_tugas FROM tugas WHERE user_id = ? order by id desc', [userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async store(data) {
        return new Promise((resolve, reject) => {
            connect.query('INSERT INTO tugas SET ?', data, function(err, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getByMapel(mapel_id) {
        return new Promise((resolve, reject) => {
            connect.query('SELECT id, judul, file_tugas, deskripsi, DATE_FORMAT(tanggal_deadline, "%d-%m-%Y") AS tanggal_deadline, waktu_deadline FROM tugas WHERE mapel_id = ? ORDER BY id DESC', [mapel_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async getByTugasId(tugas_id) {
        return new Promise((resolve, reject) => {
            connect.query('SELECT waktu_deadline, id, DATE_FORMAT(tanggal_deadline, "%Y-%m-%d") AS tanggal_deadline, mapel_id FROM tugas WHERE id = ? ORDER BY id DESC', tugas_id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }
}

module.exports = tugas_model;
