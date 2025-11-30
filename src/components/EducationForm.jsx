import React, { useState } from 'react';
import axios from 'axios';

const EducationForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ degree: '', institution: '', year: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://portfolio-assignment-backend-d9zp.onrender.com/api/educations', form);
      onSubmit();
      setForm({ degree: '', institution: '', year: '' });
    } catch (err) {
      alert('Error submitting education');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Add Education</h3>
      <input name="degree" value={form.degree} onChange={handleChange} placeholder="Degree" className="w-full p-2 mb-2 border rounded" required />
      <input name="institution" value={form.institution} onChange={handleChange} placeholder="Institution" className="w-full p-2 mb-2 border rounded" required />
      <input name="year" value={form.year} onChange={handleChange} placeholder="Year" className="w-full p-2 mb-2 border rounded" required />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default EducationForm;