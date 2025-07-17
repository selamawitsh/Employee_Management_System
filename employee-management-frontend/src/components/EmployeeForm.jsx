import React, { useState, useEffect } from 'react';
import API from '../services/api';

function EmployeeForm({ employee, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: ''
  });

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name || '',
        email: employee.email || '',
        position: employee.position || '',
        department: employee.department || '',
        salary: employee.salary ? employee.salary.toString() : ''
      });
    } else {
      setForm({
        name: '',
        email: '',
        position: '',
        department: '',
        salary: ''
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.position || !form.department || !form.salary) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      if (employee) {
        // Update existing employee
        await API.put(`/employees/${employee._id}`, { 
          ...form, 
          salary: Number(form.salary) 
        });
        alert('Employee updated!');
      } else {
        // Add new employee
        await API.post('/employees', { 
          ...form, 
          salary: Number(form.salary) 
        });
        alert('Employee added!');
      }
      onSave(); // Refresh list and close form
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-8 rounded-lg shadow-lg bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white"
    >
      <h3 className="text-2xl font-bold mb-6 text-blue-300">
        {employee ? 'Edit Employee' : 'Add Employee'}
      </h3>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        name="position"
        placeholder="Position"
        value={form.position}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        name="salary"
        placeholder="Salary"
        type="number"
        value={form.salary}
        onChange={handleChange}
        className="w-full mb-6 px-4 py-2 rounded bg-gray-800 border border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          {employee ? 'Update' : 'Add'}
        </button>
        {employee && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;
