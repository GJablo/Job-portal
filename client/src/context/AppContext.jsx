import { createContext } from 'react';
import React from 'react';
import { jobsData } from '../assets/assets';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = React.useState({
    title: '',
    location: '',
  });

  const [isSearched, setIsSearched] = React.useState(false);

  const [jobs, setJobs] = React.useState([]);

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
  };
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}
