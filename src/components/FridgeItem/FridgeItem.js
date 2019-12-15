import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ApiContext from '../../contexts/ApiContext';
import ItemsApiService from '../../services/items-api-service';
import itemFormatFunctions from './itemFormatFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import './FridgeItem.css'

export default class FridgeItem extends Component {
  static contextType = ApiContext;

  state = {
    amount: ''
  }

  confirmDelete = (name, id) => {
    let confirmDelete = window.confirm(`Are you sure you want to remove ${name} from your fridge? This is irreversible.`);

    if (confirmDelete) {
      ItemsApiService.deleteItem(id)
        .then(() => {
          this.context.deleteItem(id)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  updateCurrQuantity = amount => {
    const newQuantity = this.props.item.currQuantity + amount;
    const item = {quantity: newQuantity};

    ItemsApiService.patchItem(item, this.props.item.id)
      .then(() => {
        this.setState({amount: this.state.amount + amount})
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentDidMount() {
    this.setState({
      amount: this.props.item.currQuantity
    })
  }

  render() {
    if (this.props.item === null) {
      return null;
    }

    const item = this.props.item;
    const { name, dateAdded, initQuantity, note, id } = item;
    const currQuantity= this.state.amount;
    const { handleAgeFormatting, formatTime } = itemFormatFunctions;

    //Format component color (with corresponding class) and date className must go before dateAdded because it helps set dependent variables
    const className = handleAgeFormatting(item);
    const formattedDateAdded = formatTime(dateAdded)

    const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
    const editIcon = <FontAwesomeIcon icon={faEdit} />;
    const plusIcon = <FontAwesomeIcon icon={faPlus} />;
    const minusIcon = <FontAwesomeIcon icon={faMinus} />;

    return (
      <li className='FridgeItem__li mainContainer'>
        
        <div className='FridgeItem__div addSubtractContainer buttonContainer'>
            {/* if the current amount is less than the original amount, let an active increment button show up, else a disabled button */}
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
        
        <div className={`FridgeItem__div sansAddSubtractButtons ${className}`}>
         
          <div className='FridgeItem__div topRow'>
            <div className='FridgeItem__div deleteEditContainer buttonContainer'>
              {/* delete button */}
              <button className='FridgeItem__button deleteEdit' onClick={() => this.confirmDelete(name, id)}><span className='notMobile'>Delete</span>{' '}<span className='mobile'>{deleteIcon}</span></button>
              {/* edit button */}
              <Link to={`/demo/edit-item/${id}`}><button className='FridgeItem__button deleteEdit'><span className='notMobile'>Edit</span>{' '}<span className='mobile'>{editIcon}</span></button></Link>
            </div>  
            <h4 className='FridgeItem__h4'>{name}</h4>
          </div>

          <ul className='FridgeItem__ul itemInfo bottomRow'>
            <ul className='FridgeItem__ul itemInfo sansNote'>
              <li className='FridgeItem__li itemInfo'>
                <span className='FridgeItem__info'>Qty:</span> {currQuantity}
              </li>
              <li className='FridgeItem__li itemInfo'>
                <span className='notMobile'>Added: </span>{formattedDateAdded}
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