import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
        <label>Username</label>
        <input name="username" value={form.username} onChange={handleChange} />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />
        <button type="submit" style={{ marginTop: '1rem' }}>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
