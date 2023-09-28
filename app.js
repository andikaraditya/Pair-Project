const express = require('express')
const app = express()
const session = require("express-session")
const port = 3000

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))
app.use("/images", express.static('images'))

app.use(session({
  secret: "super secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.use(require("./routes/route.js"))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})