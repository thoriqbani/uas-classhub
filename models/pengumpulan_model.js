const connect = require('../config/db.js');

class pengumpulan_model {
    static async store(data) {
        return new Promise((resolve, reject) => {
            connect.query('INSERT INTO pengumpulan SET ?', data, function(err, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async update(data, user_id) {
        return new Promise((resolve, reject) => {
            connect.query('UPDATE pengumpulan SET ? where id = ?', [data, user_id], function(err, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getByUserAndTugasId(tugas_id) {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM pengumpulan join user on pengumpulan.user_id = user.id WHERE tugas_id = ?', [tugas_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getByUserAndMapel(user_id, mapel_id) {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM pengumpulan WHERE user_id = ? AND mapel_id = ?', [user_id, mapel_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = pengumpulan_model;
