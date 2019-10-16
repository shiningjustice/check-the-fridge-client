import React from 'react';

export default React.createContext({
  items: [], 
  sections: [],
  search: false, 
  filteredFolders: [], 
  sort: '', 
  error: null,
  addItem: () => {},
  deleteItem: () => {},
  updateForOptions: () => {},
  getForStandard: () => {}
})