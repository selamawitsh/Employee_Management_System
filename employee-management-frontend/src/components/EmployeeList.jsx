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
    <div>
      <h3>Employee List</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>${emp.salary}</td>
              <td>
                <button onClick={() => onEdit(emp)}>Edit</button>{' '}
                <button onClick={() => deleteEmployee(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="6">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
