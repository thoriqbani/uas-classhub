const connect = require('../config/db.js');

class pelajaran_model {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM pelajaran ORDER BY id DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getByID(pelajaranID) {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM pelajaran where id = ? ORDER BY id DESC', pelajaranID, (err, rows) => {
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
            connect.query('INSERT INTO pelajaran SET ?', data, function(err, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async update(data, pelajaranID) {
        return new Promise((resolve, reject) => {
            connect.query('UPDATE pelajaran set ? WHERE id = ?', [data, pelajaranID], function(err, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async delete(pelajaranID) {
        return new Promise((resolve, reject) => {
            connect.query('DELETE FROM pelajaran WHERE id = ?', pelajaranID, function(err, result) {
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

module.exports = pelajaran_model;
