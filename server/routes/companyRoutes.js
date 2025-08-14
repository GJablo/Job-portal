import express from 'express'
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';

const router = express.Router();

// endpoints
// register a company
router.post('/register', upload.single('image'), registerCompany);

// login company
router.post('/login', loginCompany);

// get company data
router.get('/company', getCompanyData);

// post a job
router.post('/post-job', postJob);

// get applicants data of company
router.get('/applicants', getCompanyJobApplicants);

// get company posted jobs (job-list)
router.get('/list-jobs', getCompanyPostedJobs);

// change application status
router.post('/change-status', changeJobApplicationsStatus);

// manage job visibility
router.post('/change-visibility', changeVisibility);

const companyRoutes = router;

export default companyRoutes;
