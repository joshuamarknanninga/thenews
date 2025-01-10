const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadVideo, getFeed, addComment, getComments } = require('../controllers/videoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Configure Multer to store uploaded videos locally for MVP
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// /api/videos/upload
router.post('/upload', authMiddleware, upload.single('video'), uploadVideo);
// /api/videos/feed
router.get('/feed', getFeed);
// /api/videos/comment
router.post('/comment', authMiddleware, addComment);
// /api/videos/comments/:videoId
router.get('/comments/:videoId', getComments);

module.exports = router;
