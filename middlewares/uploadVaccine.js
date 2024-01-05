const multer = require('multer');

const uploadDirectory = '/home/developer/uploads/pets/vaccine';
const localDirectory = './uploads/pets/vaccine'

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (req, file, callback) => {
    const ext = file.originalname.split('.').pop();
    callback(null, `VAC_${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 30 * 1024 * 1024 } });


module.exports = upload;
