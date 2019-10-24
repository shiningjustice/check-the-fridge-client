import React, { Component } from 'react';
import moment from 'moment';

import FridgeItem from '../FridgeItem/FridgeItem';
// import EmptySection from './EmptySection/EmptySection';
import ApiContext from '../../contexts/ApiContext';

const now = new Date();
let daysAgo;
let monthsAgo;

//console.log(cleanup --- move a lot of this logic to fridgeItem)

export default class FridgeSection extends Component {
  static contextType = ApiContext;

  // addsEmptyMessage = name => {
  //   if (this.context.items.length === 0) {
  //     return (
  //       <li></li>
  //     )
  //   }
  // }

  calculateTimePassed = time => {
    daysAgo = (moment(time).diff(now, 'days'))*-1; // # of days ago
    monthsAgo = (moment(time).diff(now, 'months'))*-1; // # of days ago
  }

  formatTime = time => {    
    // const weekday = moment(time).format('dd'); // Weekday spelled out
    const date = moment(time).format('MM/D');  
    if (daysAgo === 0) {
      return 'Today'
    }
    else if (daysAgo === 1) {
      return 'Yesterday'
    }
    else if (monthsAgo < 1) {
      return `${daysAgo} days ago (${date})`
    }
    else if (monthsAgo === 1) {
      return `${monthsAgo} month ago`
    }
    else {
      return `${monthsAgo} months ago`
    }
  }

  handleAgeFormatting = (item) => {
    this.calculateTimePassed(item.dateAdded);
    let className;

    //If item goes bad quickest (fruit, veggies, and  leftovers)
    if (item.sectionId === 1 || item.sectionId === 2 || item.sectionId === 11) {
    // if ([1, 2, 11].indexOf(item.sectionId) > 0) {
      if (daysAgo <= 7) {
        className = 'age_good'
      }
      if (daysAgo > 7 && daysAgo < 14) {
        className = 'age_okay'
      }
      if (daysAgo >= 14) {
        className = 'age_bad'
      }
    } 
    //If item goes bad quick (dairy, deli/bread)
    else if (item.sectionId === 3 || item.sectionId === 8) {
      if (daysAgo <= 7) {
        className = 'age_good'
      }
      if (daysAgo > 7 && daysAgo < 14) {
        className = 'age_okay'
      }
      if (daysAgo >= 14) {
        className = 'age_bad'
      }
    } 
    //If item goes bad slowly (meat, frozen)
    else if (item.sectionId === 4 || item.sectionId === 9 || item.sectionId === 10) {
      if (monthsAgo <= 3) {
        className = 'age_good'
      }
      if (monthsAgo > 3 && monthsAgo < 6) {
        className = 'age_okay'
      }
      if (daysAgo >= 6) {
        className = 'age_bad'
      }
    }
    //If item geos bad very slowly (pantry, condiments)
    else if (item.sectionId === 6 || item.sectionId === 7) {
      if (monthsAgo <= 6) {
        className = 'age_good'
      }
      if (monthsAgo > 6 && monthsAgo < 12) {
        className = 'age_okay'
      }
      if (daysAgo >= 12) {
        className = 'age_bad'
      }
    }  
    return `FridgeItem__li ${className}`;
  }

  handleMatchSectionId = (id, item) => {
    if (id === item.sectionId) {
      return (
        <FridgeItem 
          key={item.id}
          name={item.name}
          id={item.id}
          //className must go before dateAdded because it helps set dependent variables
          className={this.handleAgeFormatting(item)}
          dateAdded={this.formatTime(item.dateAdded)}
          note={item.note}
          initQuantity={item.initQuantity}
          currQuantity={item.currQuantity}
        />
      )
    }

  }
  
  render() {
    const { id, name } = this.props;
    const { items } = this.context;
    
    return (
      <>
        <h3>{name}</h3>
        <ul className='FridgeSection__div mainContainer'>
          {items.map(item => this.handleMatchSectionId(id, item))}
        </ul>
      </>
    )
  }
}