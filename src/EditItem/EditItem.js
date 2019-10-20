import React, { Component } from 'react';

import ItemForm from '../ItemForm/ItemForm'
import ApiContext from '../ApiContext';

export default class EditItem extends Component {
  static contextType = ApiContext;

  render () {
    let { items } = this.context;

    if (items.length === 0) {
      return null;
    }

    const itemId = this.props.match.params.id; 
    const item = items.find(item => +item.id === +itemId); 

    console.log(item.id)

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