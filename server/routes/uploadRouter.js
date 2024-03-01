const express=require('express');
const multer=require('multer');

const router=express.Router();

const storage= multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/assets')
        },
        filename: function (req, file, cb) {
        //   let extArray = file.mimetype.split("/");
        //   let extension = extArray[extArray.length - 1];
        //   cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)        
          cb(null,Math.floor(Date.now() / 1000)+file.originalname)
        }
      })
    


const upload=multer({storage:storage});

router.post('/',upload.single("image"), (req,res)=>{

    // console.log(req.file);
    try{
        res.send({ status: "success", message: `${req.file.originalname} uploaded!` })
    } catch(err){
        res.send({ status: "err", error: err })
    }

})


module.exports=router;