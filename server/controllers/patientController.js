import Patient from '../models/Patient.js'
// Contrôleur pour obtenir tous les patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ success: true, message: 'Patients found', data: patients });
    
  } catch (error) {
    res.status(404).json({ success: false, message: 'No patients found', error: error.message });
  }
};

// Contrôleur pour obtenir un seul patient par son ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.status(200).json({ success: true, message: 'Patient found', data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// Contrôleur pour mettre à jour les informations d'un patient
export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Patient updated successfully', data: patient });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update patient', error: error.message });
  }
};

// Contrôleur pour supprimer un patient par son ID
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.status(200).json({ success: true, message: 'Patient deleted successfully', data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete patient', error: error.message });
  }
};
