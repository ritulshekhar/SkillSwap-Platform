import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    teachSkills: '',
    learnSkills: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        teachSkills: formData.teachSkills.split(',').map(s => s.trim()),
        learnSkills: formData.learnSkills.split(',').map(s => s.trim())
      };
      const res = await api.post('/auth/register', payload);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        alert('✅ Registration successful!');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        alert('⚠️ Unexpected response from server.');
      }
    } catch (err) {
      console.error('Register error:', err.response || err.message);
      const msg = err.response?.data?.message || '❌ Registration failed';
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="teachSkills" placeholder="Skills you can teach (comma separated)" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="learnSkills" placeholder="Skills you want to learn (comma separated)" onChange={handleChange} className="w-full border p-2 rounded" required />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>

        <p className="text-sm text-center">
          Already registered? <Link to="/" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </form>
    </div>
  );
}