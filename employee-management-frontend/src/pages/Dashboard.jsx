import React, { useState, useEffect } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser.user);
    }
  }, []);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleSave = () => {
    setSelectedEmployee(null);
    setRefreshFlag(flag => !flag); 
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      {user.role === 'admin' && (
        <EmployeeForm
          employee={selectedEmployee}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <EmployeeList onEdit={handleEdit} refreshFlag={refreshFlag} />
    </div>
  );
}

export default Dashboard;
