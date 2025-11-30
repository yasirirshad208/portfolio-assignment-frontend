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
      
      {/* UI Section - Header with Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Contact Messages</h1>
            <p className="text-blue-100">Manage and view all your contact inquiries</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
            <div className="text-3xl font-bold">{contacts.length}</div>
            <div className="text-sm text-blue-100">Total Messages</div>
          </div>
        </div>
      </div>

      {user?.role === 'admin' && (
        <button onClick={() => setShowForm(!showForm)} className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
          {showForm ? 'Hide Add Form' : 'Add New Contact'}
        </button>
      )}
      {showForm && <ContactForm onSubmit={fetchContacts} />}
      <div className="grid grid-cols-1 gap-4 mt-6">
        {contacts.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500 text-lg">No contact messages yet</p>
            <p className="text-gray-400 text-sm mt-2">Messages from visitors will appear here</p>
          </div>
        ) : (
          contacts.map(c => (
            <div key={c._id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{c.name}</h3>
                      <p className="text-sm text-gray-500">{c.email}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-3 ml-13">{c.message}</p>
                </div>
                {user?.role === 'admin' && (
                  <button 
                    onClick={async () => { 
                      await axios.delete(`https://portfolio-assignment-backend-d9zp.onrender.com/api/contacts/${c._id}`); 
                      fetchContacts(); 
                    }} 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded transition-colors ml-4"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactPage;