import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://portfolio-assignment-backend-d9zp.onrender.com/api/users');
      setUsers(res.data);
    } catch (err) {
      alert('Error fetching users');
    }
  };

  const updateRole = async (id, role) => {
    try {
      await axios.put(`https://portfolio-assignment-backend-d9zp.onrender.com/api/users/${id}/role`, { role });
      fetchUsers();
    } catch (err) {
      alert('Error updating role');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      {users.map(user => (
        <div key={user._id} className="mb-2 p-2 border rounded">
          <p>{user.name} ({user.email}) - Role: {user.role}</p>
          <select onChange={(e) => updateRole(user._id, e.target.value)} value={user.role} className="mt-1">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default UserManagement;