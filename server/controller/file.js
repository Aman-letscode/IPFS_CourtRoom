const multer = require('multer');
const Moralis = require('moralis').default;
const bodyParser = require('body-parser')
const fs = require('fs')


const DIR = 'upload/'

Moralis.start({
  apiKey:"rlj5OeelA5zjylVByWoHFMYmhPZQ3itOVmAwCKglHI5K66lUDWgiPUdj26NAV8hH"
})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})


async function uploadIPFS(file){
    
  
    const array = [
      {
        path: file,
        content: fs.readFileSync(file, {encoding: 'base64'})
      }
    ]
  
    const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi: array,
    });
  
    console.log(response.result);
    return await response.result;
  }


module.exports = {upload, uploadIPFS};