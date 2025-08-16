import { createContext } from 'react';
import React from 'react';
import { jobsData } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = React.useState({
    title: '',
    location: '',
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const [isSearched, setIsSearched] = React.useState(false);

  const [jobs, setJobs] = React.useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = React.useState(false);

  const [companyToken, setCompanyToken] = React.useState(null);
  const [companyData, setCompanyData] = React.useState(null);

  // Function to fetch jobs
  const fetchJobs = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/jobs`);

      if (data.success) {
        setJobs(data.jobs);
        toast.success('Jobs fetched successfully');
      } else {
        toast.error('Failed to fetch jobs');
      }
    } catch (error) {
      toast.error('Error fetching jobs');
    }
  }

  // function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/company/company`, {headers:{token: companyToken}});
      if (data.success) {
        toast.success('Company data fetched successfully');
        setCompanyData(data.company);
      } else {
        toast.error('Failed to fetch company data');
      }
    } catch (error) {
      toast.error('Error fetching company data');
    }
  }

  React.useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem('companyToken');
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  React.useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    jobs,
    setJobs,
    setIsSearched,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}
