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

    static async getByUserID(user_id) {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM materi WHERE user_id = ? ORDER BY id DESC', [user_id], (err, rows) => {
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
            connect.query('SELECT judul, deskripsi, file_materi, status FROM materi WHERE user_id = ? order by id desc', [userId], (err, rows) => {
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

}

module.exports = materi_model;
