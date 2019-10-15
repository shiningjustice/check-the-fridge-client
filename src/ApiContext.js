import React from 'react';

export default React.createContext({
  items: [], 
  sections: [],
  addItem: () => {},
  deleteItem: () => {},
})