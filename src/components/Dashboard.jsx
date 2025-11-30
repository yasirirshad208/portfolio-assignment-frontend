import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Portfolio Dashboard</h1>
        <button onClick={signOut} className="bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/contacts" className="bg-white p-6 rounded shadow text-center hover:bg-gray-50">
          <h2 className="text-xl font-bold">Contacts</h2>
          <p>Manage contact messages</p>
        </Link>
        <Link to="/educations" className="bg-white p-6 rounded shadow text-center hover:bg-gray-50">
          <h2 className="text-xl font-bold">Education</h2>
          <p>View qualifications</p>
        </Link>
        <Link to="/projects" className="bg-white p-6 rounded shadow text-center hover:bg-gray-50">
          <h2 className="text-xl font-bold">Projects</h2>
          <p>Explore portfolio projects</p>
        </Link>
      </div>
      {user?.role === 'admin' && (
        <div className="mt-8">
          <Link to="/users" className="bg-blue-500 text-white px-4 py-2 rounded">Manage Users</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;