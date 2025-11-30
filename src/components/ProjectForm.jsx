import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ title: '', description: '', link: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://portfolio-assignment-backend-d9zp.onrender.com/api/portfolio', form);
      onSubmit();
      setForm({ title: '', description: '', link: '' });
    } catch (err) {
      alert('Error submitting project');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Add Project</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 mb-2 border rounded" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 mb-2 border rounded" required />
      <input name="link" value={form.link} onChange={handleChange} placeholder="Link" className="w-full p-2 mb-2 border rounded" />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default ProjectForm;