const connect = require('../config/db.js');

class guru_model {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM user WHERE level_user = "guru" ORDER BY id DESC', (err, rows) => {
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
            connect.query('INSERT INTO user SET ?', data, function(err, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async login(email) {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM user WHERE email = ?', email, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getByID(id) {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM user WHERE user.id = ?', id, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async getByEmail(email) {
        return new Promise((resolve, reject) => {
            connect.query('SELECT * FROM user WHERE email = ?', email, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Update(id, data) {
        return new Promise((resolve, reject) => {
            connect.query('UPDATE user SET ? WHERE id = ?', [data, id], function(err, result) {
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
            connect.query('DELETE FROM user WHERE id = ?', id, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = guru_model;
