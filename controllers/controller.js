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
                    res.redirect("/home")
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

    static home (req, res) {
        Course.findAll()
        .then((result) => {
            res.render("home", {result}) 
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    }

    static courseDetail (req, res) {
        const params = req.params

        Course.findByPk(params.id)
        .then((result) => {
            res.render("courseDetail", {result})
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    }
    
    static profilePage(req, res) {
        const {id} = req.params
        User.findByPk(id, {
            include: [UserProfile, Role]
        })
            .then((result) => {
                // res.send(result)
                res.render("profile-page", {result})
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static editProfilePage(req, res) {
        const {id} = req.params
        let user
        User.findByPk(id)
            .then((result) => {
                user = result
                return UserProfile.findOne({
                    where: {
                        UserId: id
                    }
                })
            })
            .then((userProfile) => {
                // res.send({user, userProfile})
                res.render("profile-edit", {user, userProfile})
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static updateProfile(req, res) {
        const {id} = req.params
        const {firstName, lastName, email, password, dateOfBirth, education} = req.body
        User.update({
            email,
            password
        },{
            where: {
                id:id
            }
        })
            .then((result) => {
                return UserProfile.update({
                    firstName,
                    lastName,
                    dateOfBirth,
                    education
                },{
                    where: {
                        UserId: id
                    }
                })
            })
            .then((result) => res.redirect(`/profile/${id}`))
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    static home (req, res) {
        Course.findAll()
        .then((result) => {
            res.render("home", {result}) 
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    }

    static courseDetail (req, res) {
        const params = req.params

        Course.findByPk(params.id)
        .then((result) => {
            res.render("courseDetail", {result})
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    static profilePage(req, res) {
        const {id} = req.params
        User.findByPk(id, {
            include: [UserProfile, Role]
        })
            .then((result) => {
                // res.send(result)
                res.render("profile-page", {result})
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static editProfilePage(req, res) {
        const {id} = req.params
        let user
        User.findByPk(id)
            .then((result) => {
                user = result
                return UserProfile.findOne({
                    where: {
                        UserId: id
                    }
                })
            })
            .then((userProfile) => {
                // res.send({user, userProfile})
                res.render("profile-edit", {user, userProfile})
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static updateProfile(req, res) {
        const {id} = req.params
        const {firstName, lastName, email, password, dateOfBirth, education} = req.body
        User.update({
            email,
            password
        },{
            where: {
                id:id
            }
        })
            .then((result) => {
                return UserProfile.update({
                    firstName,
                    lastName,
                    dateOfBirth,
                    education
                },{
                    where: {
                        UserId: id
                    }
                })
            })
            .then((result) => res.redirect(`/profile/${id}`))
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }
}

module.exports = Controller