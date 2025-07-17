import express from 'express';
import mongoose from 'mongoose';

const employee = new mongoose.Schema({
    name: {
        type: String,   
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
})

export default mongoose.model('Employee', employee);