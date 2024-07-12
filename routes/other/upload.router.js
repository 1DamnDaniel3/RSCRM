const express = require('express');
const router = express.Router();
const UploadContoller = require('../../controllers/other/uploads.controller');

router.post('/upload', UploadContoller.uploadFile);

module.exports = router;