import React from 'react';

export default React.createContext({
  items: [], 
  sections: [],
  search: '', 
  filteredFolders: [], 
  sort: '', 
  error: null,
  addItem: () => {},
  deleteItem: () => {},
  // setSearch: () => {},
  updateForOptions: () => {},
  setSections: () => {}
})