const {Course, Role, User, UserCourse, UserProfile} = require('../models');
const bcrypt = require('bcryptjs')

class Controller {

    static loginPage(req, res) {
        const {errors} = req.query
        res.render("login-page", {errors})
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
                    req.session.UserId = account.id
                    console.log(req.session.UserId)
                    return UserProfile.findOne({
                        where: {
                            UserId: req.session.UserId
                        }
                    })
                } else {
                    res.redirect(`/?errors=Wrong password or email`)
                }
            })
            .then((result) => {
                if (!result) {
                    res.redirect(`/profile/${req.session.UserId}/add`)
                } else {
                    res.redirect("/home")
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
        const {search} = req.query
        const {UserId} = req.session
        Course.findAll()
        .then((result) => {
            res.render("home", {result, UserId}) 
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    }

    static courseDetail (req, res) {
        const {UserId} = req.session
        const params = req.params

        Course.findByPk(params.id, {
            include: {
                model: User,
                include: UserProfile
            },
        })
        .then((result) => {
            // res.send(result)
            res.render("courseDetail", {result, UserId})
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
        }

    static logoutUser(req, res) {
        req.session.destroy((result) => {
            res.redirect("/")
        })
    }

    static getPremium(req, res) {
        const {id} = req.params
        User.findByPk(id)
            .then((user) => {
                return user.update({RolesId:2})
            })
            .then((result) => res.redirect(`/profile/${id}`))
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static addProfilePage(req, res) {
        const {id} = req.params
        res.render("profile-add", {id})
    }

    static createUserProfile(req, res) {
        const {id} = req.params
        const {firstName, lastName, email, dateOfBirth, education} = req.body
        UserProfile.create({firstName, lastName, email, dateOfBirth, education, UserId: id})
            .then((result) => res.redirect("/home"))
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static enrolledCourse(req, res) {
        const {UserId} = req.session
        User.findByPk(UserId, {
            include: Course
        })
        .then((result) => {
            // res.send(result)
            res.render("enrolledCourse", {UserId, result})
        })
    }

    static joinCourse(req, res) {
        const {UserId} = req.session
        const {id} = req.params
        UserCourse.create({
            UserId: UserId,
            CourseId: id
        })
            .then((result) => res.redirect("/home"))
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static complete(req, res) {
        const {UserId} = req.session
        const courseId = req.params.id
        
        UserCourse.update({courseStatus: true}, {
            where: {
                UserId: UserId,
                CourseId: courseId
            }
        })
        .then((result) => {
            res.redirect("/home")
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
    }
}

module.exports = Controller