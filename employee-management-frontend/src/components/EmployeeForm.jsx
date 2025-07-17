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
    <form onSubmit={handleSubmit}>
      <h3>{employee ? 'Edit Employee' : 'Add Employee'}</h3>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="position"
        placeholder="Position"
        value={form.position}
        onChange={handleChange}
      />
      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
      />
      <input
        name="salary"
        placeholder="Salary"
        type="number"
        value={form.salary}
        onChange={handleChange}
      />
      <button type="submit">{employee ? 'Update' : 'Add'}</button>
      {employee && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}

export default EmployeeForm;
