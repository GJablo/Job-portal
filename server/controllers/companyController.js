import Company from "../models/Company.js"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'


// register a company
export const registerCompany = async (req, res) => {

  const {name, email, password} = req.body

  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({success:false, message: "Missing Details"})
  }

  try {
    const companyExists = await Company.findOne({email})

    if (companyExists) {
      return res.json({success: false, message:"Company already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const imageUpload = await cloudinary.uploader.upload(imageFile.path)

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url
    })

    res.json({success: true, company: {
      _id: company._id,
      name: company.name,
      email: company.email,
      image: company.image
    }

    })


  } catch (error) {
    
  }

}

// login a company
export const loginCompany = async (req, res) => {}

// get company data
export const getCompanyData = async (req, res) => {}

// post a new job
export const postJob = async (req, res) => {}

// get company job applicants
export const getCompanyJobApplicants = async (req, res) => {}

// get posted jobs by a company
export const getCompanyPostedJobs = async (req, res) => {}

// change job applications status
export const changeJobApplicationsStatus = async (req, res) => {}

// change job visibility
export const changeVisibility = async (req, res) => {}
