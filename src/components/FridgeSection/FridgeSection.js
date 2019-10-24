import React, { Component } from 'react';

import FridgeItem from '../FridgeItem/FridgeItem';
// import EmptySection from './EmptySection/EmptySection';
import ApiContext from '../../contexts/ApiContext';

export default class FridgeSection extends Component {
  static contextType = ApiContext; 
  
  render() {
    const { id, name } = this.props;
    const { items } = this.context;
    
    return (
      <>
        <h3>{name}</h3>
        <ul className='FridgeSection__div mainContainer'>
          {items.map(item => (id === item.sectionId) && (
            <FridgeItem 
              key={item.id}
              item={item}
            />
          ))}
        </ul>
      </>
    )
  }
}