const connect = require('../config/db.js')

class jadwal_model {
    static async getAllByHariSenin(){
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.mapel_id, nama_mapel, hari, jam_awal, jam_akhir, user.nama from jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id where hari = "senin"', (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }
    
    static async getAllByHariSelasa(){
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.mapel_id, nama_mapel, hari, jam_awal, jam_akhir, user.nama from jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id where hari = "selasa"', (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async getAllByHariRabu(){
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.mapel_id, nama_mapel, hari, jam_awal, jam_akhir, user.nama from jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id where hari = "rabu"', (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async getAllByHariKamis(){
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.mapel_id, nama_mapel, hari, jam_awal, jam_akhir, user.nama from jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id where hari = "kamis"', (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async getAllByHariJumat(){
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.mapel_id, nama_mapel, hari, jam_awal, jam_akhir, user.nama from jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id where hari = "jumat"', (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async getAllByHariSabtu(){
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.mapel_id, nama_mapel, hari, jam_awal, jam_akhir, user.nama from jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id where hari = "sabtu"', (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async getByID(id){
        return new Promise((resolve, reject) => {
            connect.query('SELECT jadwal.mapel_id, nama_mapel, hari, jam_awal, jam_akhir, user.nama from jadwal JOIN user ON jadwal.user_id = user.id JOIN pelajaran ON jadwal.mapel_id = pelajaran.id where mapel_id = ? ', id, (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async getByUserID(user_id){
        return new Promise((resolve, reject) => {
            connect.query('SELECT * from jadwal where user_id = ? ', user_id, (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }
}

module.exports = jadwal_model;