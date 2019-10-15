import React, { Component } from 'react';
import FridgeItem from '../FridgeItem/FridgeItem';
import ApiContext from '../ApiContext'

export default class FridgeSection extends Component {
  static contextType = ApiContext;

  static defaultProps = {
    match: {
      params: {}
    }
  }

  // handleDeleteItem = id => {
  //   this.props.history.push(`/`)
  // }

  handleMatchSectionId(id, item) {
    if (id === item.sectionId) {
      return (
        <li key={item.id} className='FridgeItem__li'>
          <FridgeItem 
            name={item.name}
            id={item.id}
            dateAdded={item.dateAdded}
            note={item.note}
            initQuantity={item.initQuantity}
            currQuantity={item.currQuantity}
            // onDeleteItem={this.handleDeleteItem}
          />
        </li>
      )
    }
  }
  render() {
    const { id, name } = this.props;
    const { items } = this.context;
    return (
      <>
        <h3>{name}</h3>
        <ul>
          {items.map(item => this.handleMatchSectionId(id, item))}
        </ul>
      </>
    )
  }
}