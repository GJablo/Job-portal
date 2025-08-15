import express from "express"
import { getJobs, getSingleJob } from "../controllers/jobController.js";

const router = express.Router()

// route to get all jobs
router.get('/', getJobs)


// route to get single job by id
router.get('/:id', getSingleJob)

const jobRoutes = router;

export default jobRoutes;
