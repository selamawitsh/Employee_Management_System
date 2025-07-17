import React, { useEffect, useState } from 'react';
import API from '../services/api';

function EmployeeList({ onEdit, refreshFlag }) {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await API.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees(); 
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refreshFlag]); 

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 rounded-lg shadow-lg bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
      <h3 className="text-2xl font-bold mb-6 text-blue-300">Employee List</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg shadow border border-blue-900">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-blue-200">Name</th>
              <th className="px-4 py-2 text-left text-blue-200">Email</th>
              <th className="px-4 py-2 text-left text-blue-200">Position</th>
              <th className="px-4 py-2 text-left text-blue-200">Department</th>
              <th className="px-4 py-2 text-left text-blue-200">Salary</th>
              <th className="px-4 py-2 text-left text-blue-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="hover:bg-gray-800 transition">
                <td className="px-4 py-2 border-t border-blue-900">{emp.name}</td>
                <td className="px-4 py-2 border-t border-blue-900">{emp.email}</td>
                <td className="px-4 py-2 border-t border-blue-900">{emp.position}</td>
                <td className="px-4 py-2 border-t border-blue-900">{emp.department}</td>
                <td className="px-4 py-2 border-t border-blue-900">${emp.salary}</td>
                <td className="px-4 py-2 border-t border-blue-900">
                  <button
                    onClick={() => onEdit(emp)}
                    className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded mr-2 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEmployee(emp._id)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-blue-200">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
