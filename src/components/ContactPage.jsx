import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';
import axios from 'axios';

const ContactPage = () => {
  const { user } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(user?.role !== 'admin'); // Show for users by default

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('https://portfolio-assignment-backend-d9zp.onrender.com/api/contacts');
      setContacts(res.data);
    } catch (err) {
      alert('Error fetching contacts');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="mb-4">
        <Link to="/" className="mr-4 text-blue-500">Dashboard</Link>
        <Link to="/educations" className="mr-4 text-blue-500">Education</Link>
        <Link to="/projects" className="text-blue-500">Projects</Link>
      </nav>
      <h1 className="text-3xl font-bold mb-4">Contacts</h1>
      {user?.role === 'admin' && (
        <button onClick={() => setShowForm(!showForm)} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
          {showForm ? 'Hide Add Form' : 'Add New Contact'}
        </button>
      )}
      {showForm && <ContactForm onSubmit={fetchContacts} />}
      <div className="grid grid-cols-1 gap-4">
        {contacts.map(c => (
          <div key={c._id} className="bg-white p-4 rounded shadow">
            <p><strong>{c.name}</strong>: {c.message}</p>
            {user?.role === 'admin' && (
              <button onClick={async () => { await axios.delete(`https://portfolio-assignment-backend-d9zp.onrender.com/api/contacts/${c._id}`); fetchContacts(); }} className="text-red-500 mt-2">Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;