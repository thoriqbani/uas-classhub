var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('home');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', async function(req, res) {
  let { name, email, password } = req.body
  let enskripsi = await bcrypt.hash(password, 5)
  let data = {
    name,
    photos: req.file.filename,
    email,
    password: enskripsi,
    level_user: 1
  }
  user_model.Store(data)
  req.flash('success', 'Berhasil menyimpan')
  res.redirect('/login')
})

module.exports = router;