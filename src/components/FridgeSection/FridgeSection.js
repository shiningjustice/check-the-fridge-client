import React, { Component } from 'react';

import FridgeItem from '../FridgeItem/FridgeItem';
// import EmptySection from './EmptySection/EmptySection';
import ApiContext from '../../contexts/ApiContext';

export default class FridgeSection extends Component {
  state = {
    fridge: null,
  }
  static contextType = ApiContext; 

  render() {
    const { id, name, display, fridge } = this.props;
    const items = fridge[id - 1].sectionItems;

    return (
      <>
        {/* If we're returning a search/filter/sort query, only return section if it contains an item */}
        {(display) && (
          <>
            <h3>{name}</h3>
            <ul className='FridgeSection__div mainContainer'>
              {/* Render as normal, but if section has no items, make note of that */
                (items.length > 0)
                  ? items.map(item => (
                    <FridgeItem 
                      key={item.id}
                      item={item}
                    />
                  ))
                  : <li>{`You have no ${name.toLowerCase()} items.`}</li>
              }
            </ul>
          </>
        )}
      </>
    )
  }
}