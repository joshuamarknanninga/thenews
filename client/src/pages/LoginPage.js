import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.user.username);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
        <label>Username</label>
        <input name="username" value={form.username} onChange={handleChange} />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />
        <button type="submit" style={{ marginTop: '1rem' }}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
