import moment from 'moment';

// //className must go before dateAdded because it helps set dependent variables
// className={this.handleAgeFormatting(item)}
// dateAdded={this.formatTime(item.dateAdded)}

const now = new Date();
let daysAgo;
let monthsAgo;

const itemFormatFunctions = {
  formatTime(time) {    
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
  },
  handleAgeFormatting(item) {

    const time = item.dateAdded;
    daysAgo = (moment(time).diff(now, 'days'))*-1; // # of days ago
    monthsAgo = (moment(time).diff(now, 'months'))*-1; // # of days ago
    
    //If item goes bad quickest (fruit, veggies, and  leftovers)
    if (item.sectionId === 1 || item.sectionId === 2 || item.sectionId === 11) {
    // if ([1, 2, 11].indexOf(item.sectionId) > 0) {
      if (daysAgo <= 7) {
        return 'age_good'
      }
      if (daysAgo > 7 && daysAgo < 14) {
        return 'age_okay'
      }
      if (daysAgo >= 14) {
        return 'age_bad'
      }
    } 
    //If item goes bad quick (dairy, deli/bread)
    else if (item.sectionId === 3 || item.sectionId === 8) {
      if (daysAgo <= 7) {
        return 'age_good'
      }
      if (daysAgo > 7 && daysAgo < 14) {
        return 'age_okay'
      }
      if (daysAgo >= 14) {
        return 'age_bad'
      }
    } 
    //If item goes bad slowly (meat, frozen)
    else if (item.sectionId === 4 || item.sectionId === 9 || item.sectionId === 10) {
      if (monthsAgo <= 3) {
        return 'age_good'
      }
      if (monthsAgo > 3 && monthsAgo < 6) {
        return 'age_okay'
      }
      if (daysAgo >= 6) {
        return 'age_bad'
      }
    }
    //If item geos bad very slowly (pantry, condiments)
    else if (item.sectionId === 6 || item.sectionId === 7) {
      if (monthsAgo <= 6) {
        return 'age_good'
      }
      if (monthsAgo > 6 && monthsAgo < 12) {
        return 'age_okay'
      }
      if (daysAgo >= 12) {
        return 'age_bad'
      }
    }
  }
}

export default itemFormatFunctions;