const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

class UploadController {
    static uploadFile(req, res) {
        upload.single('photo')(req, res, (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).json({ message: "Failed to upload file", error: err.message });
            }
            res.status(200).json({ message: 'File uploaded successfully', file: req.file });
        });
    }
}

module.exports = UploadController;
