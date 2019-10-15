import React, { Component } from 'react';

import config from '../config';
import ApiContext from '../ApiContext';

export default class FridgeItem extends Component {

  static contextType = ApiContext;

  deleteItem (itemId) {
    fetch(config.API_ENDPOINT + `/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json"
      }
    })
      .then( res => {
        if (!res.ok){
          return res.json().then(error => Promise.reject(error))
        }
        //no content returned if call is successful, so skip this line
      })
      .then(() => {
        this.context.deleteItem(itemId)
        // this.props.onDeleteItem(itemId)
      })
      .catch(error => {
        console.error(error)
      })

  }

  render() {
    const { name, initQuantity, dateAdded, note } = this.props;
    return (
      <>
        <h4>{name}</h4>
        <ul className='FridgeItem__ul'>
          <li>
            <span className='FridgeItem__info'>Amount:</span> {initQuantity}
          </li>
          <li>
            <span className='FridgeItem__info'>Added:</span> {dateAdded}
          </li>
          {note && <li>
            <span className='FridgeItem__info'>Note:</span> {note}
          </li>}
        </ul>
        <button onClick={() => this.deleteItem(this.props.id)}>Delete</button>
      </>
    )
  }
}