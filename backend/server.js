const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config()
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
const authRoutes = require('./src/routes/auth')
const roleRoutes = require('./src/routes/roles')
const articleRoutes = require('./src/routes/articles')
app.use('/api/auth', authRoutes)
app.use('/api/roles', roleRoutes)
app.use('/api/articles', articleRoutes)
const PORT = process.env.PORT || 4000
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mean_cms'
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGO).then(()=>{
    app.listen(PORT, ()=> console.log('Server listening on', PORT))
  }).catch(err=>{
    console.error(err)
    process.exit(1)
  })
}
module.exports = app
