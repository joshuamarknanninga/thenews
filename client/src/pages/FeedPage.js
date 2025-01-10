import React, { useEffect, useState } from 'react';
import API from '../services/api';
import VideoCard from '../components/VideoCard';

function FeedPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await API.get('/videos/feed');
        setVideos(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeed();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Feed</h2>
      {videos.map(video => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}

export default FeedPage;
