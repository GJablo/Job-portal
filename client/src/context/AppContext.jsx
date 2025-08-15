import { createContext } from 'react';
import React from 'react';
import { jobsData } from '../assets/assets';

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
    setJobs(jobsData);
  }

  React.useEffect(() => {
    fetchJobs();
  }, []);

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
