import React from 'react';

export default React.createContext({
  fridge: [],
  items: [], 
  sections: [],
  search: '', 
  currentItemId: '',
  filteredFolders: [], 
  sort: '', 
  error: null,
  errorDemoMain: null,
  addItem: () => {},
  editItem: () => {},
  deleteItem: () => {},
  updateForOptions: () => {},
  setCurrentItemId: () => {},
  getFridgeItemsAndSections: () => {},
  showModal: () => {},
})