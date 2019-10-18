import React from 'react';

export default React.createContext({
  items: [], 
  sections: [],
  search: '', 
  filteredFolders: [], 
  sort: '', 
  searchOn: false, 
  error: null,
  addItem: () => {},
  deleteItem: () => {},
  updateForOptions: () => {},
  resetAppState: () => {},
  setSort: () => {},
  setItems: () => {},
  getForStandard: () => {}
})