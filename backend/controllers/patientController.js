// backend/controllers/patientController.js
import Patient from '../models/Patient.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Please provide name, email, password' });

  const exists = await Patient.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const patient = await Patient.create({ name, email, password });
  res.status(201).json({ id: patient._id, name: patient.name, email: patient.email, token: genToken(patient._id) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });

  const patient = await Patient.findOne({ email });
  if (patient && (await patient.matchPassword(password))) {
    res.json({ id: patient._id, name: patient.name, email: patient.email, token: genToken(patient._id) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
export const getProfile = async (req, res) => {
  const patient = await Patient.findById(req.patient._id).select('-password');  
    if (patient) {      
        res.json(patient);    
    }       
    else {      
        res.status(404).json({ message: 'Patient not found' });    
    }   
};
export const updateProfile = async (req, res) => {      
    const patient = await Patient.findById(req.patient._id);
    if (patient) {      
        patient.name = req.body.name || patient.name;      
        patient.email = req.body.email || patient.email;
        if (req.body.password) {
            patient.password = req.body.password;
        }   
        const updatedPatient = await patient.save();      
        res.json({        
            id: updatedPatient._id, 
            name: updatedPatient.name,
            email: updatedPatient.email,    
            token: genToken(updatedPatient._id)      
        });    
    }   
}
