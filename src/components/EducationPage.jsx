import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import EducationForm from './EducationForm';
import axios from 'axios';

const EducationPage = () => {
  const { user } = useContext(AuthContext);
  const [educations, setEducations] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const res = await axios.get('https://portfolio-assignment-backend-d9zp.onrender.com/api/educations');
      setEducations(res.data);
    } catch (err) {
      alert('Error fetching educations');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="mb-4">
        <Link to="/" className="mr-4 text-blue-500">Dashboard</Link>
        <Link to="/contacts" className="mr-4 text-blue-500">Contacts</Link>
        <Link to="/projects" className="text-blue-500">Projects</Link>
      </nav>
      <h1 className="text-3xl font-bold mb-4">Education</h1>
      {user?.role === 'admin' && (
        <button onClick={() => setShowForm(!showForm)} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
          {showForm ? 'Hide Add Form' : 'Add New Education'}
        </button>
      )}
      {showForm && user?.role === 'admin' && <EducationForm onSubmit={fetchEducations} />}
      <div className="grid grid-cols-1 gap-4">
        {educations.map(e => (
          <div key={e._id} className="bg-white p-4 rounded shadow">
            <p>{e.degree} - {e.institution} ({e.year})</p>
            {user?.role === 'admin' && (
              <button onClick={async () => { await axios.delete(`https://portfolio-assignment-backend-d9zp.onrender.com/api/educations/${e._id}`); fetchEducations(); }} className="text-red-500 mt-2">Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationPage;