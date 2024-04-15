import express from 'express';
import {
    getAllOrthophonistes,
    getOrthophonisteById,
    updateOrthophonisteById,
    deleteOrthophonisteById
  } from "../controllers/userController.js";
  const router = express.Router();
// route ortho

// Route pour récupérer tous les docteurs
router.get("/", getAllOrthophonistes);
// Route pour récupérer un seul docteur par son ID
router.get("/:id", getOrthophonisteById);
// Route pour mettre à jour un docteur par son ID
router.put("/:id", updateOrthophonisteById);
// Route pour supprimer un docteur par son ID
router.delete("/:id", deleteOrthophonisteById);
export {router as OrthoRoutes};