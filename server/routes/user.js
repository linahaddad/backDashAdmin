import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js"; // Importez User au lieu de Orthophonistes
import Patient from "../models/Patient.js"; // Importez le modèle de Patient
import nodemailer from "nodemailer";
const router = express.Router();
router.post("/signup", async (req, res) => {
  const { username, email, password, dateNaissance, numTelephone, region, diplome, anneeExperience } = req.body;
  const user = await User.findOne({ email }); // Utilisez User

  if (user) {
    return res.json({ message: "Orthophoniste already exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newOrthophoniste = new User({
    username,
    email,
    password: hashpassword,
    dateNaissance,
    numTelephone,
    region,
    diplome,
    anneeExperience
  });

  await newOrthophoniste.save(); // Sauvegardez dans la nouvelle collection Orthophonistes
  return res.json({ message: "Orthophoniste registered" });
});


router.post("/signuppatient", async (req, res) => {
  const { username, email, password, dateNaissance, numTelephone, region, diplome, anneeExperience, /* autres champs spécifiques aux patients */ } = req.body;
  const existingPatient = await Patient.findOne({ email });

  if (existingPatient) {
    return res.json({ message: "Patient already exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newPatient = new Patient({
    username,
    email,
    password: hashpassword,
    dateNaissance,
    numTelephone,
    region,
    diplome,
    anneeExperience,
    // Ajoutez d'autres champs spécifiques aux patients selon vos besoins
  });

  try {
    await newPatient.save();
    return res.json({ message: "Patient registered" });
  } catch (error) {
    console.error("Error creating patient account:", error);
    return res.status(500).json({ message: "An error occurred while registering the patient" });
  }
});











router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ status: false, message: "User is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ status: false, message: "Password is incorrect" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "Login successful" });
});
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user not registred" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "youremail@gmail.com",
        pass: "yourpassword",
      },
    });

    var mailOptions = {

      from: "youremail@gmail.com",
      to: email,
      subject: "Reset Password",
      text: "http://localhost:5173/resetPassword/${token}",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending email" });
      } else {
        return res.json({ status: true, message: "email sent " });
      }
    });
  } catch (err) {
    console.log(err);
  }
});
router.post('/reset-password/:token', async(req,res) => {
  // vérifier token 
  const {token} = req.params;
  const {password} = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    //hash the password and updated fil bd
    const hashPassword = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate({_id: id}, {password: hashPassword})
    return res.json({status : true, message: "updated password"})

  } catch(err) {
    return res.json("invalid token")

  }
})
// dima nasna3 il protected route hedhy mta3 protected routes
const verifyUser = async (req,res, next) =>{
  try{
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status : false , message : "no token"});
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    next()
  } catch (err) {
    return res.json(err);
  }
};


router.get('/verify' ,verifyUser, (req,res) =>{
  return res.json({status: true, message: "authorized"})
});


//log out router
router.get('/logout', (req,res) =>{
  res.clearCookie('token')
  return res.json({status: true})
})



export { router as UserRouter };
