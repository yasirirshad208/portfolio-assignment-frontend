import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import axios from 'axios';

const ProjectPage = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('https://portfolio-assignment-backend-d9zp.onrender.com/api/portfolio');
      setProjects(res.data);
    } catch (err) {
      alert('Error fetching projects');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="mb-4">
        <Link to="/" className="mr-4 text-blue-500">Dashboard</Link>
        <Link to="/contacts" className="mr-4 text-blue-500">Contacts</Link>
        <Link to="/educations" className="text-blue-500">Education</Link>
      </nav>
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      {user?.role === 'admin' && (
        <button onClick={() => setShowForm(!showForm)} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
          {showForm ? 'Hide Add Form' : 'Add New Project'}
        </button>
      )}
      {showForm && user?.role === 'admin' && <ProjectForm onSubmit={fetchProjects} />}
      <div className="grid grid-cols-1 gap-4">
        {projects.map(p => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <p><strong>{p.title}</strong>: {p.description} <a href={p.link} className="text-blue-500">Link</a></p>
            {user?.role === 'admin' && (
              <button onClick={async () => { await axios.delete(`https://portfolio-assignment-backend-d9zp.onrender.com/api/portfolio/${p._id}`); fetchProjects(); }} className="text-red-500 mt-2">Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;