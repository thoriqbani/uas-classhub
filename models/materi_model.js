const connect = require('../config/db.js');

class materi_model {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM materi ORDER BY id DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getByMateriID(materi_id) {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM materi WHERE materi.id = ? ORDER BY materi.id DESC', [materi_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async update(data, materiID) {
        return new Promise((resolve, reject) => {
            connect.query('UPDATE materi set ? WHERE id = ?', [data, materiID], function(err, result) {
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
            connect.query('SELECT * FROM materi WHERE mapel_id = ? ORDER BY id DESC', [mapel_id], (err, rows) => {
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
            connect.query('SELECT judul, deskripsi, file_materi, status, materi.id FROM materi WHERE user_id = ? order by id desc', [userId], (err, rows) => {
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
            connect.query('INSERT INTO materi SET ?', data, function(err, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async delete(materiID) {
        return new Promise((resolve, reject) => {
            connect.query('DELETE FROM materi WHERE id = ?', materiID, function(err, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = materi_model;
