import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import config from '../config';
import ApiContext from '../ApiContext';

export default class FridgeItem extends Component {
  static contextType = ApiContext;

  state = {
    amount: ''
  }

  deleteItem = itemId => {
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

  updateCurrQuantity = amount => {
    const newQuantity = this.props.currQuantity + amount;
    const item = {currQuantity: newQuantity};
    
    fetch(`${config.API_ENDPOINT}/items/${this.props.id}`, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
      })
      .then(() => {
        this.setState({amount: this.state.amount + amount})
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentDidMount() {
    this.setState({
      amount: this.props.currQuantity
    })
  }

  render() {
    const { name, initQuantity, currQuantity, dateAdded, note, id } = this.props;
    return (
      <>
        <h4>{name}</h4>
        <ul className='FridgeItem__ul'>
          <li>
            <span className='FridgeItem__info'>Amount:</span> {this.state.amount || currQuantity}
          </li>
          <li>
            <span className='FridgeItem__info'>Added:</span> {dateAdded}
          </li>
          {note && <li>
            <span className='FridgeItem__info'>Note:</span> {note}
          </li>}
        </ul>

        {/* if there's more than one item left, have the decrement button show up */}
        {(this.state.amount > 1) && <button className='FridgeItem__button' onClick={() => this.updateCurrQuantity(-1)}>-</button>}

        {/* if the current amount is less than the original amount, let an increment button show up */}
        {(this.state.amount < initQuantity) && <button className='FridgeItem__button' onClick={() => this.updateCurrQuantity(1)} >+</button>}

        {/* delete button */}
        <button className='FridgeItem__button' onClick={() => this.deleteItem(this.props.id)}>Delete</button>
        
        {/* edit button */}
        <Link to={`/demo/edit-item/${id}`}><button className='FridgeItem__button'>Edit</button></Link>
      </>
    )
  }
}