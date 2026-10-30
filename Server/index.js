
 
var  errorMiddleware = require('./ErrorMiddleware')
var express = require('express');
var bodyParser= require('body-parser')
var cors = require('cors')
const serverConnection = require('./Connection')
const pageRoute= require('./Routes/Pages')
const loginRoute = require('./Routes/LoginRoute')
const menuRoute = require('./Routes/MenuRoute')
const subMenuRoute = require('./Routes/SubmenuRoute')
const menuGroupRoute = require('./Routes/MenuGroupRoute')
const SliderFileupload = require('./Routes/SliderFileupload')
const media2Route2= require('./Routes/MediaRoute2')
const videoRoute= require('./Routes/VideoRoute')
const settingRoute= require('./Routes/VideoRoute')
const videoGalleryRoute= require('./Routes/VideoGalleryRoutes')
const manageAlbumRoute= require('./Routes/MangeAlbumRoute')
const HomesliderRoute= require('./Routes/HomeSliderRoutes')
const sliderRoute= require('./Routes/SliderRoute')
const categoryRoute= require('./Routes/CategoryRoute')
const blogRoute= require('./Routes/BlogRoute')
// const blogUploadRoute= require('./Routes/BlogUploadImgRoute')
const mediauploadRoute= require('./Routes/MediafileuploadRoute')
const MediamainPageRoute= require('./Routes/MediaMainPageRoute')
const dashboardCount = require('./Routes/DashboardRotes')
const blogUploadRoute = require('./Routes/BlogUPloadRoute')

const app = express()
const port = 5000


serverConnection

app.use(cors())
app.use(bodyParser.json())
app.use(errorMiddleware)
// Serve static files from the "images" directory
app.use("/Images", express.static("Images"))
app.use("/api",loginRoute)
app.use("/api",pageRoute)
app.use("/api",menuRoute)
app.use("/api",subMenuRoute)
app.use("/api",menuGroupRoute)
app.use('/api',SliderFileupload)
app.use('/api',media2Route2)
app.use('/api',videoRoute)
app.use('/api',settingRoute)
app.use('/api',videoGalleryRoute)
app.use('/api',manageAlbumRoute)
app.use('/api',HomesliderRoute)
app.use('/api',sliderRoute)
app.use('/api',categoryRoute)
app.use('/api',blogRoute)
app.use('/api',blogUploadRoute)
app.use('/api',mediauploadRoute)
app.use('/api',MediamainPageRoute)
app.use('/api',dashboardCount)

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})



