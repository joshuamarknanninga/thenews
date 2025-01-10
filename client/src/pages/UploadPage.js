import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const navigate = useNavigate();

  const handleFileChange = e => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!video) {
      alert('Please select a video file first.');
      return;
    }
    const formData = new FormData();
    formData.append('video', video);
    formData.append('caption', caption);
    formData.append('hashtags', hashtags);

    try {
      await API.post('/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Video uploaded!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
        <label>Select Video</label>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <label>Caption</label>
        <input value={caption} onChange={(e) => setCaption(e.target.value)} />
        <label>Hashtags (comma separated)</label>
        <input value={hashtags} onChange={(e) => setHashtags(e.target.value)} />
        <button type="submit" style={{ marginTop: '1rem' }}>Upload</button>
      </form>
    </div>
  );
}

export default UploadPage;
