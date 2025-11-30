import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://portfolio-assignment-backend-d9zp.onrender.com/api/contacts', form);
      onSubmit();
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      alert('Error submitting contact');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Add Contact</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 mb-2 border rounded" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 mb-2 border rounded" required />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="w-full p-2 mb-2 border rounded" required />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default ContactForm;