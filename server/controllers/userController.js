import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";

// get user data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId; 
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// apply for job
export const applyForJob = async (req, res) => {
  const {jobId} = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.find({jobId, userId});
    if (isAlreadyApplied.length > 0) {
      return res.status(400).json({ success: false, message: "You have already applied for this job" });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    await JobApplication.create({
      userId,
      companyId: jobData.companyId,
      jobId,
      date: Date.now(),
    });
    res.status(200).json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// get user applied applications
export const getUserJobApplications = async (req, res) => {}

// update user profile(resume)
export const updateUserResume = async (req, res) => {}

