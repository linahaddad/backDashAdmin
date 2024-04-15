import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    diplome: { type: String },
    anneeExperience: { type: Number },
    photo: { type: String }
});

// Spécifier le nom de la nouvelle collection "Orthophonistes"
const Orthophonistes = mongoose.model("Orthophonistes", UserSchema);

export { Orthophonistes as User };
