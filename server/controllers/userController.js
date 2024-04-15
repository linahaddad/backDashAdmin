
import { User } from "../models/User.js"; // Importez User au lieu de Orthophonistes

// Contrôleur pour récupérer tous les orthophonistes
export const getAllOrthophonistes = async (req, res) => {
  try {
    const orthophonistes = await User.find();
    res.status(200).json({ success: true, message: "Orthophonistes found", data: orthophonistes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orthophonistes", error: error.message });
  }
};

// Contrôleur pour récupérer un seul orthophoniste par son ID
export const getOrthophonisteById = async (req, res) => {
  const { id } = req.params;
  try {
    const orthophoniste = await User.findById(id);
    if (!orthophoniste) {
      return res.status(404).json({ success: false, message: "Orthophoniste not found" });
    }
    res.status(200).json({ success: true, message: "Orthophoniste found", data: orthophoniste });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orthophoniste", error: error.message });
  }
};

// Contrôleur pour mettre à jour un orthophoniste par son ID
export const updateOrthophonisteById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOrthophoniste = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedOrthophoniste) {
      return res.status(404).json({ success: false, message: "Orthophoniste not found" });
    }
    res.status(200).json({ success: true, message: "Orthophoniste updated", data: updatedOrthophoniste });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update orthophoniste", error: error.message });
  }
};

// Contrôleur pour supprimer un orthophoniste par son ID
export const deleteOrthophonisteById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrthophoniste = await User.findByIdAndDelete(id);
    if (!deletedOrthophoniste) {
      return res.status(404).json({ success: false, message: "Orthophoniste not found" });
    }
    res.status(200).json({ success: true, message: "Orthophoniste deleted", data: deletedOrthophoniste });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete orthophoniste", error: error.message });
  }
};
