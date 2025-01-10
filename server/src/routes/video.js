const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const r2 = require('../config/r2');
const authMiddleware = require('../middlewares/authMiddleware');
const { uploadVideo, getFeed, addComment, getComments } = require('../controllers/videoController');

const upload = multer({
  storage: multerS3({
    s3: r2,
    bucket: process.env.R2_BUCKET_NAME,
    acl: 'public-read',  // or "private" if you'd rather manage signed URLs
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = `videos/${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
      cb(null, uniqueName);
    }
  })
});

// /api/videos/upload
router.post('/upload', authMiddleware, upload.single('video'), uploadVideo);

// /api/videos/feed
router.get('/feed', getFeed);

// /api/videos/comment
router.post('/comment', authMiddleware, addComment);

// /api/videos/comments/:videoId
router.get('/comments/:videoId', getComments);

module.exports = router;
