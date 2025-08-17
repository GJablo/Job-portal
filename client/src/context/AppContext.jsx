import { createContext } from 'react';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth, useUser } from '@clerk/clerk-react';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = React.useState({
    title: '',
    location: '',
  });

  const {user} = useUser();
  const {getToken} = useAuth();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const [isSearched, setIsSearched] = React.useState(false);

  const [jobs, setJobs] = React.useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = React.useState(false);

  const [companyToken, setCompanyToken] = React.useState(null);
  const [companyData, setCompanyData] = React.useState(null);

  const [userData, setUserData] = React.useState(null);
//  const [userToken, setUserToken] = React.useState(null);
  const [userApplications, setUserApplications] = React.useState([]);


  // function to fetch user data
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error('User not authenticated');
        return;
      }
      const {data} = await axios.get(`${backendUrl}/api/users/user`, {headers: {Authorization: `Bearer ${token}`}});
      if (data.success) {
        setUserData(data.user);
        toast.success('User data fetched successfully');
      } else {
        toast.error('Failed to fetch user data');
      }
    } catch (error) {
      toast.error('Error fetching user data');
    }
  } 


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

  React.useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

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
    userData,
    setUserData,
    fetchUserData,
    userApplications,
    setUserApplications,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}
