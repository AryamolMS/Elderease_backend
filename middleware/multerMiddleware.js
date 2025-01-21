//import multer 
const multer = require('multer')

//disckstorage is used to create the storage place
const storage = multer.diskStorage ({
    //destination - where location in which the file is stored
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    //filename - the name in which the file is stored
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})


//filefilter
const fileFilter = (req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype==='image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('only png, jpeg, jpg files are allowed'))
    }
}

//create multer config
const multerConfig = multer({
    storage,
    fileFilter
})

//export multer
module.exports = multerConfig