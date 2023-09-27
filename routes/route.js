const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

//Halaman pertama. Ada pilihan join atau register
router.get("/", Controller.loginPage)

//Tampilkan form untuk menerima email dan password user
router.get("/register")
router.post("/register")

//User login. Cek database sama atau nggak, kemudian redirect ke home
router.get("/login")
router.post("/login")

//Halaman home
router.get("/home")
/**
 * Di halaman home:
 * Ada opsi edit profile
 * Ada search bar cari course
 * Ada tombol GET PREMIUM ACCOUNT
 * 
 * Tampilkan button untuk kategori course yg sudah dengan yg belum selesai
 * Tampilkan semua course yang ada, kalau di klik pindah ke detail course-nya
 */

//Detail masing-masing course
router.get("/course")
//Disini ada nama course, deskripsi, sama harga

router.get("/premium")
router.get("/premium/subscription")
router.post("/premium/subscription")

router.get("/profile")
router.get("/profile/edit")
router.post("/profile/edit")

router.get("/course/add")
router.post("/course/add")


/** CRUD COURSE DISINI */


module.exports = router