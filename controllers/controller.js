const {Course, Role, User, UserCourse, UserProfile} = require('../models');

class Controller {

    static loginPage(req, res) {
        res.render("login-page")
    }

    static registerPage(req, res) {
        res.render("register-page")
    }

    static registerAccount(req, res) {
        const {email, password} = req.body
        User.create({email, password})
            .then(() => res.redirect("/"))
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }
}

module.exports = Controller