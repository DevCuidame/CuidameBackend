const multer = require('multer');

const uploadDirectory = '/home/developer/uploads/pets/profile';
const localDirectory = './uploads/pets/profile'

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, localDirectory);
  },
  filename: (req, file, callback) => {
    const ext = file.originalname.split('.').pop();
    callback(null, `PET_${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 30 * 1024 * 1024 } });


module.exports = upload;
