import React, { useState, useEffect } from "react";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser.user);
    }
  }, []);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleSave = () => {
    setSelectedEmployee(null);
    setRefreshFlag((flag) => !flag);
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
        <p className="text-xl text-blue-200">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white py-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-blue-300">
          Welcome, {user.name}
        </h2>
        {user.role === "admin" && (
          <EmployeeForm
            employee={selectedEmployee}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
        <EmployeeList onEdit={handleEdit} refreshFlag={refreshFlag} />
      </div>
    </div>
  );
}

export default Dashboard;
