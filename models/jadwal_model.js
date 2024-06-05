const connect = require('../config/db.js');

class jadwal_model {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM jadwal', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.id, nama_mapel, hari, jam_awal, jam_akhir, user.nama, jadwal.mapel_id FROM jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id WHERE jadwal.id = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async create(hari, jam_awal, jam_akhir, user_id, mapel_id) {
        return new Promise((resolve, reject) => {
            connect.query('INSERT INTO jadwal (hari, jam_awal, jam_akhir, user_id, mapel_id) VALUES (?, ?, ?, ?, ?)', [hari, jam_awal, jam_akhir, user_id, mapel_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async update(id, hari, jam_awal, jam_akhir, user_id, mapel_id) {
        return new Promise((resolve, reject) => {
            connect.query('UPDATE jadwal SET hari = ?, jam_awal = ?, jam_akhir = ?, user_id = ?, mapel_id = ? WHERE id = ?', [hari, jam_awal, jam_akhir, user_id, mapel_id, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            connect.query('DELETE FROM jadwal WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getAllByHariSenin() {
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.id, nama_mapel, hari, jam_awal, jam_akhir, user.nama FROM jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id WHERE hari = "senin"', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getAllByHariSelasa() {
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.id, nama_mapel, hari, jam_awal, jam_akhir, user.nama FROM jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id WHERE hari = "selasa"', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getAllByHariRabu() {
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.id, nama_mapel, hari, jam_awal, jam_akhir, user.nama FROM jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id WHERE hari = "rabu"', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getAllByHariKamis() {
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.id, nama_mapel, hari, jam_awal, jam_akhir, user.nama FROM jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id WHERE hari = "kamis"', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getAllByHariJumat() {
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.id, nama_mapel, hari, jam_awal, jam_akhir, user.nama FROM jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id WHERE hari = "jumat"', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getAllByHariSabtu() {
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.id, nama_mapel, hari, jam_awal, jam_akhir, user.nama FROM jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id WHERE hari = "sabtu"', (err, rows) => {
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
            connect.query('SELECT * FROM jadwal WHERE user_id = ?', [user_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = jadwal_model;
