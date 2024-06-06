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

    static async store(data) {
        return new Promise((resolve, reject) => {
            connect.query('INSERT INTO jadwal set ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async update(data, jadwalID) {
        return new Promise((resolve, reject) => {
            connect.query('UPDATE jadwal SET ? WHERE id = ?', [data, jadwalID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async delete(jadwalID) {
        return new Promise((resolve, reject) => {
            connect.query('DELETE FROM jadwal WHERE id = ?', jadwalID, (err, result) => {
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
            connect.query('SELECT jadwal.id, nama_mapel, hari, jam_awal, jam_akhir, user.nama FROM jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id WHERE hari = "senin" order by jam_awal asc', (err, rows) => {
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
            connect.query('SELECT jadwal.id, nama_mapel, hari, jam_awal, jam_akhir, user.nama FROM jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id WHERE hari = "selasa" order by jam_awal asc', (err, rows) => {
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
            connect.query('SELECT jadwal.id, nama_mapel, hari, jam_awal, jam_akhir, user.nama FROM jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id WHERE hari = "rabu" order by jam_awal asc', (err, rows) => {
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
            connect.query('SELECT jadwal.id, nama_mapel, hari, jam_awal, jam_akhir, user.nama FROM jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id WHERE hari = "kamis" order by jam_awal asc', (err, rows) => {
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
            connect.query('SELECT jadwal.id, nama_mapel, hari, jam_awal, jam_akhir, user.nama FROM jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id WHERE hari = "jumat" order by jam_awal asc', (err, rows) => {
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
            connect.query('SELECT jadwal.id, nama_mapel, hari, jam_awal, jam_akhir, user.nama FROM jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id WHERE hari = "sabtu" order by jam_awal asc', (err, rows) => {
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
