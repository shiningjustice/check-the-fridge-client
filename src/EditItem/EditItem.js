import React, { Component } from 'react';

import ItemForm from '../ItemForm/ItemForm'
import ApiContext from '../ApiContext';

export default class EditItem extends Component {
  static contextType = ApiContext;

  render () {
    let { items } = this.context;
    console.log(items);

    if (items.length === 0) {
      return null;
    }
    //i need to get the item from the array. i can't index it because if it sorts differently like with a sort it wont' work. i need to get it by the id

    const itemId = this.props.match.params.id; // <-- returns 2
    const item = items.find(item => item.id === itemId); // item here returns undefined

    //if i run the code below and comment out line 19
    // const item = items[0]; <-- this returns the correct item
    // console.log(item.id); <-- this returns 2, like it should 
    
    return (
      <ItemForm
        formName='EditItem'
        formVerb='Edit'
        history={this.props.history}
        item={item}
      />
    )
  }
}