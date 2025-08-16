import React from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const ManageJobs = () => {

  const navigate = useNavigate()

  const [jobs, setJobs] = React.useState(false);
  const {  backendUrl, companyToken } = React.useContext(AppContext);

  // function to fetch company jobs
  const fetchCompanyJobs = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        headers: {
          token: companyToken,
        },
      });

      if (!data || !data.success) {
        throw new Error("Failed to fetch jobs");
      }

      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);
        toast.success("Jobs fetched successfully");
      } else {
        toast.error(data.message || "Failed to fetch jobs");
      }
    } catch (error) {
      toast.error("An error occurred while fetching jobs");
    }

  }

  React.useEffect(() => {
    if (!companyToken) {
      toast.error("Please login to manage jobs");
      navigate("/dashboard");
    } else {
      fetchCompanyJobs();
    }
  }, [companyToken, navigate]);

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 border-b text-left">Job Title</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">
                Date
              </th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">
                Location
              </th>
              <th className="py-2 px-4 border-b text-center">Applicants</th>
              <th className="py-2 px-4 border-b text-left">Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b">{job.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {moment(job.date).format("ll")}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {job.location}
                </td>
                <td className="py-2 px-4 border-b text-center">{job.applicants}</td>
                <td className="py-2 px-4 border-b">
                  <input className="scale-125 ml-4" type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={() => navigate("/dashboard/add-job")} type="" className="bg-black text-white py-2 px-4 rounded">Add new job</button>
      </div>
    </div>
  );
};

export default ManageJobs;
