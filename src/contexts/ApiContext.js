import React from 'react';

export default React.createContext({
  items: [], 
  sections: [],
  search: '', 
  currentItemId: '',
  filteredFolders: [], 
  sort: '', 
  searchOn: false, 
  error: null,
  addItem: () => {},
  editItem: () => {},
  deleteItem: () => {},
  updateForOptions: () => {},
  setCurrentItemId: () => {},
  getForStandard: () => {}
})