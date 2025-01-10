import React from 'react';

function VideoCard({ video }) {
  // This is just a placeholder since we are storing videos in /uploads locally
  // In a real production environment, you'd host and stream the videos properly
  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
      <p>User: {video.user.username}</p>
      <video
        src={`http://localhost:4000/${video.videoPath}`}
        controls
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <p>{video.caption}</p>
      <p>Hashtags: {video.hashtags && video.hashtags.join(', ')}</p>
      <small>{new Date(video.createdAt).toLocaleString()}</small>
    </div>
  );
}

export default VideoCard;
