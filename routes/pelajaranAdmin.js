const express = require("express");
const router = express.Router();
const jadwal_model = require("../models/jadwal_model");
const admin_model = require("../models/admin_model");
const guru_model = require("../models/guru_model");
const tugas_model = require("../models/tugas_model");
const materi_model = require("../models/materi_model");
const pelajaran_model = require("../models/pelajaran_model");

router.get("/", async (req, res) => {
  try {
    let userId = req.session.userId;
    let data_user = await admin_model.getAll();

    let user = await admin_model.getByID(userId);
    console.log(user);
    let pelajaran_list = await pelajaran_model.getAll();

    if (user.length > 0) {
      if (user[0].level_user != "admin") {
        res.redirect("/logout");
      } else {
        res.render("admin/create_pelajaran", {
          pages: "pelajaran",
          user_list: data_user,
          pelajaran_list: pelajaran_list,
          nama: user[0].nama,
          level_user: user[0].level_user,
          photos: user[0].photos,
          email: user[0].email,
        });
      }
    } else {
      res.status(401).json({ error: "user tidak ada" });
    }
  } catch (error) {
    console.error(error);
    res.status(501).json("error pada fungsi");
  }
});

router.get("/update/(:pelajaranId)", async (req, res) => {
  try {
    let { pelajaranId } = req.params;
    let userId = req.session.userId;
    let data_user = await admin_model.getAll();

    let user = await admin_model.getByID(userId);
    console.log(user);
    let pelajaran_list = await pelajaran_model.getByID(pelajaranId);

    if (user.length > 0) {
      if (user[0].level_user != "admin") {
        res.redirect("/logout");
      } else {
        res.render("admin/update_pelajaran", {
          pages: "pelajaran",
          user_list: data_user,
          pelajaran_list: pelajaran_list,
          nama: user[0].nama,
          level_user: user[0].level_user,
          photos: user[0].photos,
          email: user[0].email,
        });
      }
    } else {
      res.status(401).json({ error: "user tidak ada" });
    }
  } catch (error) {
    console.error(error);
    res.status(501).json("error pada fungsi");
  }
});

// CREATE: Add a new jadwal
router.post("/create", async (req, res) => {
  try {
    const { nama_mapel, user_id } = req.body;

    const data = {
      nama_mapel,
      user_id,
    };
    console.log(data);
    await pelajaran_model.store(data);
    req.flash("success", "Create Pelajaran Berhasil !!");
    res.redirect("/admin/pelajaran");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// UPDATE: Update an existing jadwal
router.post("/update/(:pelajaranId)", async (req, res) => {
  try {
    const { pelajaranId } = req.params;
    const { nama_mapel, user_id } = req.body;
    let data = {
      nama_mapel,
      user_id,
    };
    console.log(data);
    await pelajaran_model.update(data, pelajaranId);
    req.flash("success", "Update Pelajaran Berhasil !!");
    res.redirect("/admin/pelajaran");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE: Delete an existing jadwal
router.post("/delete/:pelajaranId", async (req, res) => {
  try {
    let pelajaranId = req.params.pelajaranId;
    await pelajaran_model.delete(pelajaranId);
    req.flash("success", "Pelajaran berhasil dihapus");
    res.redirect("/admin/pelajaran");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
