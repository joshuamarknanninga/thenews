const Video = require('../models/Video');
const Comment = require('../models/Comment');

exports.uploadVideo = async (req, res) => {
  try {
    const { caption, hashtags } = req.body;
    if (!req.file) {
      return res.status(400).json({ msg: 'No video file provided' });
    }

    // `req.file.location` is provided by multer-s3, but pointing to R2
    const newVideo = new Video({
      user: req.user.id,
      videoPath: req.file.location, 
      caption: caption || '',
      hashtags: hashtags ? hashtags.split(',').map(ht => ht.trim()) : []
    });

    await newVideo.save();

    return res.json({ msg: 'Video uploaded successfully', video: newVideo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const videos = await Video.find({})
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    return res.json(videos);
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;
    const comment = new Comment({
      video: videoId,
      user: req.user.id,
      text
    });
    await comment.save();
    return res.json({ msg: 'Comment added', comment });
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await Comment.find({ video: videoId }).populate('user', 'username');
    return res.json(comments);
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error' });
  }
};
