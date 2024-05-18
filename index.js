const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser');
 const authRouter  = require('./router/auth')
 const uploadRoute = require('./router/upload.route')
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
// const uploadRouter = require('./router/upload.route')
const annonceRoute = require('./router/annonce')
const categoryRoute = require('./router/category') 
const app = express()
app.use(express.static(path.join(__dirname, '../tunisie-troc/dist')));

app.use(cors({
    origin: 'https://tunisian-troc.onrender.com/', // Remplacez ceci par l'URL de votre client React
    credentials: true,
  }));
  
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
mongoose.connect(
    process.env.MONGO_URI , 
       
    
)
.then(()=>{

 
    console.log(`database connected succseffuly`)
}) 
.catch((err)=>{
    console.log(`error connexion in database ${err}`)
})


const storage = multer.memoryStorage();
 const upload = multer({ storage: storage });
 app.use('/api', authRouter)
 app.use('/api',categoryRoute)
 
 app.use('/api',upload.array('images',11),uploadRoute)
 app.use('/api',annonceRoute)

 app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../tunisie-troc/dist/index.html'));
  });
  
app.listen(PORT, ()=>{
    console.log(`server is running at PORT ${PORT}`)
}) 