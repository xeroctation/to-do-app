const express = require('express')
const app = express()
const PORT = 666

app.set('view engine', 'pug')

app.use('/static', express.static('public'))

// localhost:666 
app.get('/',(req, res) => {
    res.render('index')
})

app.listen(PORT, (err) => {
    if(err) throw err

    console.log('This app is running on port ${ PORT }')
})