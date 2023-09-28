const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()
const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images")
    },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, req.session.UserId + "." + file.mimetype.split("/")[1] )
    }
})

const upload = multer({storage: storage})

//Halaman pertama. Ada pilihan join atau register
router.get("/", Controller.loginPage)

//Tampilkan form untuk menerima email dan password user
router.get("/register", Controller.registerPage)
router.post("/register", Controller.registerAccount)

//User login. Cek database sama atau nggak, kemudian redirect ke home
router.get("/login", (req, res) => res.redirect("/"))
router.post("/login", Controller.loginAccount)

//Cek apakah user sudah login
router.use((req, res, next) => {
    if (!req.session.UserId) {
        const error = "you need to login first"
        res.redirect(`/?errors=${error}`)
    } else {
        next()
    }
})

//User yang belum login tidak bisa mengakses semua routes dibawah

//Halaman home
router.get("/home", Controller.home)
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
router.get("/course/:id", Controller.courseDetail)
//Disini ada nama course, deskripsi, sama harga

router.get("/course/:id/enroll", Controller.joinCourse)
router.get("/course/:id/complete", Controller.complete)

router.get("/enrolledCourse/:id", Controller.enrolledCourse)

router.get("/premium")
router.get("/premium/subscription")
router.post("/premium/subscription")

router.get("/profile/:id", Controller.profilePage)
router.get("/profile/:id/add", Controller.addProfilePage)
router.post("/profile/:id/add", Controller.createUserProfile)
router.get("/profile/:id/edit", Controller.editProfilePage)
router.post("/profile/:id/edit", upload.single("image"), Controller.updateProfile)
router.get("/profile/:id/delete", Controller.deleteAccount)

router.get("/logout", Controller.logoutUser)
router.get("/premium/:id", Controller.getPremium)

module.exports = router