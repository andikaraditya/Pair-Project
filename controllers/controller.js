const {Course, Role, User, UserCourse, UserProfile} = require('../models');
const bcrypt = require('bcryptjs')

class Controller {

    static loginPage(req, res) {
        res.render("login-page")
    }

    static loginAccount(req, res) {
        const {email, password} = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then((account) => {
                const isCorrect = bcrypt.compareSync(password, account.password)
                if (isCorrect) {
                    res.send(account)
                } else {
                    res.send("Wrong Password")
                }
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
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