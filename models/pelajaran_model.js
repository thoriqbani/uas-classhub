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
}

module.exports = pelajaran_model;
