import express from 'express';
import { getAllPatients, getPatientById, updatePatient, deletePatient } from '../controllers/patientController.js';
//route patient 

const router = express.Router();

// Route pour récupérer tous les patients
router.get('/patients', getAllPatients);

// Route pour récupérer un seul patient par son ID
router.get('/patients/:id', getPatientById);

// Route pour mettre à jour les informations d'un patient par son ID
router.put('/patients/:id', updatePatient);

// Route pour supprimer un patient par son ID
router.delete('/patients/:id', deletePatient);

export  {router as patientRoutes} ;
