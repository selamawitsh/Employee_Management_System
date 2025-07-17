import EmployeeModel from '../models/Employee.model.js';


const createEmployee  = async (req,res) => {
    try {
        const {name, position, department, salary, email} = req.body;
        if (!name || !position || !department || !salary || !email) {
            return res.status(400).json({message: "All fields are required"});
        }

        if (typeof salary !== 'number' || salary <= 0) {
            return res.status(400).json({message: "Salary must be a positive number"});
        }

        const newEmployee = new EmployeeModel({
            name,
            position,
            department,
            salary, 
            email
        });
        await newEmployee.save();
        res.status(201).json({message: "Employee created successfully", employee: newEmployee});
        
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({message: "internal server error"});
        
    }
    
}

const getAllEmployees = async (req, res) =>{
    try {
        const employees = await EmployeeModel.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({message: "internal server error"});
    }
}

const updateEmployee = async (req,res)=>{
    try {
        const employee = await EmployeeModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!employee) {
            return res.status(404).json({message: "Employee not found"});
        }
        res.status(200).json({message: "Employee updated successfully", employee});
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({message: "internal server error"});
        
    }
}

const deleteEmployee = async (req, res) =>{
    try {
        const employee = await EmployeeModel.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({message: "Employee not found"});
        }
        res.status(200).json({message: "Employee deleted successfully", employee});
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({message: "internal server error"});
        
    }
}

export { createEmployee, getAllEmployees, updateEmployee, deleteEmployee };
