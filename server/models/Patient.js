import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateNaissance: { type: Date },
    numTelephone: { type: String },
    region: { type: String },
    sexe: { type: String} ,
    photo: { type: String }
});

const Patient = mongoose.model("Patient", PatientSchema);

export default Patient;
