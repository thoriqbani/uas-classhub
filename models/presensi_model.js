const connect = require('../config/db.js')

class presensi_model {
    static async getPresensi(user_id, tanggal_presensi){
        return new Promise((resolve, reject) => {
            connect.query('select * from presensi where user_id = ? and tanggal_presensi = ? ', [user_id, tanggal_presensi], (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async Store(Data){
        return new Promise((resolve, reject) =>{
            connect.query('insert into presensi set ? ', Data, function(err, result){
                if(err){
                    reject(err)
                    console.log("error",err)
                } else {
                    resolve(result);
                }
            })
        })
    }
}

module.exports = presensi_model;