import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import config from '../../config';
import ApiContext from '../../contexts/ApiContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import './FridgeItem.css'

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
    const item = {quantity: newQuantity};
    
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
    const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
    const editIcon = <FontAwesomeIcon icon={faEdit} />;
    const plusIcon = <FontAwesomeIcon icon={faPlus} />;
    const minusIcon = <FontAwesomeIcon icon={faMinus} />;

    return (
      <li className='FridgeItem__li mainContainer'>
        
        <div className='FridgeItem__div addSubtractContainer buttonContainer'>
            {/* if the current amount is less than the original amount, let an increment button show up */}
            {(this.state.amount < initQuantity) 
              ? <button className='FridgeItem__button addSubtract' onClick={() => this.updateCurrQuantity(1)} >{plusIcon}</button>
              : <button className='FridgeItem__button addSubtract disabled'>{plusIcon}</button>
            }

            {/* if there's more than one item left, have the decrement button show up */}
            {(this.state.amount > 1) 
              ? <button className='FridgeItem__button addSubtract' onClick={() => this.updateCurrQuantity(-1)}>{minusIcon}</button>
              : <button className='FridgeItem__button addSubtract disabled'>{minusIcon}</button>
            }
        </div>
        
        <div className={`FridgeItem__div sansAddSubtractButtons ${this.props.className}`}>
         
          <div className='FridgeItem__div topRow'>
            <div className='FridgeItem__div deleteEditContainer buttonContainer'>
              {/* delete button */}
              <button className='FridgeItem__button deleteEdit' onClick={() => this.deleteItem(this.props.id)}><span className='notMobile'>Delete</span>{' '}<span className='mobile'>{deleteIcon}</span></button>

              {/* edit button */}
              <Link to={`/demo/edit-item/${id}`}><button className='FridgeItem__button deleteEdit'><span className='notMobile'>Edit</span>{' '}<span className='mobile'>{editIcon}</span></button></Link>
            </div>  
            <h4 className='FridgeItem__h4'>{name}</h4>
          </div>

          <ul className='FridgeItem__ul itemInfo bottomRow'>
            <ul className='FridgeItem__ul itemInfo sansNote'>
              <li className='FridgeItem__li itemInfo'>
                <span className='FridgeItem__info'>Qty:</span> {this.state.amount || currQuantity}
              </li>
              <li className='FridgeItem__li itemInfo'>
                <span className='notMobile'>Added:{' '}</span>{dateAdded}
              </li>
            </ul>
            {note && <li className='FridgeItem__li note itemInfo'>
              <span className='italic'>{note}</span>
            </li>}
          </ul>     

        </div>
        
    </li>
    )
  }
}