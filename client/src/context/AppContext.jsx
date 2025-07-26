import { createContext } from 'react';
import React from 'react';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = React.useState({
    title: '',
    location: '',
  });
  const [isSearched, setIsSearched] = React.useState(false);
  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
  };
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}
