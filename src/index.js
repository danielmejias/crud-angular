const cors = require('cors')
const express = require('express')
const path = require('path')
const app = express()
const taskRoutes = require('./routes/tasks')
//settings
app.set('views', path.join(__dirname, 'views'))
app.set('port', process.env.PORT || 3000)
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
//routes
app.use('/api', taskRoutes)
//start server
app.use(express.static(path.join(__dirname, 'dist')))
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'))
})