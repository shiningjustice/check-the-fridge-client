import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import ListView from '../ListView/ListView';
import AddItem from '../AddItem/AddItem';
import config from '../config';
import ApiContext from '../ApiContext';

import ErrorPage from '../ErrorPage';

import './App.css';

class App extends Component {
  state = {
    items: [],
    search: '',
    sections: [],
    sort: '',
    searchOn: true,
    error: null,
  }

  // sortItems = () => {
	// 	const sortBy = this.state.sort;
	// 	const items = this.context.items;
		
	// 	const datesAdded = items.map(item => item.dateAdded)

	// 	// ageOld / oldest to newest
	// 	if (sortBy === 'ageOld') {
	// 		datesAdded.sort();
	// 		return datesAdded.map(date => items.map(item => (date === item.dateAdded) && item));
	// 	}
	// 	// ageNew / newest to oldest
	// 	if (sortBy === 'ageOld') {
	// 		datesAdded.sort((a, b) => b - a)

	// 		return datesAdded.map(date => items.map(item => (date === item.dateAdded) && item));
	// 	}
	// 	// alpha / alphabetical by item
	// 	// quantLow / relatively low 
	// }

  formatQueryParams = params => {
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => {
        if (Array.isArray(params[k])) {
          return params[k].map(arrItem => esc(k) + '=' + esc(arrItem)).join('&');
        } else {
          return esc(k) + '=' + esc(params[k]);
        }
      })
      .join('&')
    return query;
  }

  updateForOptions = (search, filteredFolders, sort) => {
    console.log('App.js: UFO: updateForOptions ran' )
    console.log(`App.js: UFO: search = ${search} and filteredFolders = ${filteredFolders} and sort = ${sort}`)
    let params = {};

    //If search options are passed into option X, then set params.X
    search && (params.search = search);
    (filteredFolders.length > 0) && (params.filteredFolders = filteredFolders);
    sort && (params.sort = sort);

    let queryString = this.formatQueryParams(params);

    const url = `${config.API_ENDPOINT}/results?${queryString}`
    console.log('App.js: UFO: ' + url)

    fetch(url)
      .then(itemsRes => {
        console.log('App.js: UFO: FETCH CALL RAN')
        if (!itemsRes.ok)
          return itemsRes.json().then(e => Promise.reject(e));

        return itemsRes.json()
      })
      .then((items) => {
        console.log(items);
        let newSections; 

        //Handle display of sections in fridge and checkboxes
        filteredFolders= filteredFolders.map(folder => parseInt(folder));
        //filteredFolders is an array with items
        //using length instead of truthy because is sent in as an array, whose value is truthy
        if (filteredFolders.length > 0) {
          console.log('you rang')
          newSections = this.state.sections.filter(section =>  filteredFolders.indexOf(section.id) !== -1)
        } //filteredFolders is a string
        //using length instead of truthy because is sent in as an array, whose value is truthy
        else if (filteredFolders.length > 0 && typeof(sort) !== 'object') {
          console.log('actually here')
          newSections = filteredFolders
        } //filteredFolders doesn't have any items in it/is falsy
        else  {
          console.log('here')
          newSections = this.state.sections.filter(section => this.state.items.find(item => section.id === item.sectionId))
        }
        console.log(filteredFolders, typeof(filteredFolders), {newSections})
        
        this.setState({
          items,
          //display only sections that there are items for -- if true return section
          // sections: this.state.sections.filter(section => this.state.items.find(item => section.id === item.sectionId)),
          sections: newSections,
          search: '', 
        })
      })
      .catch(error => console.error({ error }))
  }

  getForStandard = () => {
    //reset state
    this.setState({
      items: [],
      sections: [],
      sort: '',
      search: false,
      error: null,
    })

    Promise.all([
      fetch(`${config.API_ENDPOINT}/items`),
      fetch(`${config.API_ENDPOINT}/sections`),
    ])
      .then(([itemsRes, sectionsRes]) => {
        if (!itemsRes.ok)
          return itemsRes.json().then(e => Promise.reject(e));
        if (!sectionsRes.ok)
          return sectionsRes.json().then(e => Promise.reject(e));

        return Promise.all([itemsRes.json(), sectionsRes.json()])
      })
      .then(([items, sections]) => {
        this.setState({ items, sections })
      })
      .catch(error => console.error({ error }))
  }

  addItem = item => {
    this.setState({
      items: [...this.state.items, item]
    })
  }

  deleteItem = itemId => {
    const newItems = this.state.items.filter(item => item.id !==itemId);
    this.setState({
      items: newItems
    })
  }

  resetAppState = () => {
    this.setState({
      items: [],
      search: '',
      sections: [],
      sort: '',
      searchOn: true,
      error: null,
    })
  }

  renderMainRoutes() {
    return (
      <>
        <Route exact path='/' component={ListView} />
        <Route path='/add-item' component={AddItem} />
      </>
    );
  }

  componentDidMount() {
    this.getForStandard();
  }

  
  render () {
    const value = {
      items: this.state.items,
      sections: this.state.sections,
      search: this.state.search,
      searchOn: true,
      error: this.state.error,
      addItem: this.addItem,
      deleteItem: this.deleteItem,
      setSearch: this.setSearch,
      setSort: this.sort,
      resetAppState: this.resetAppState,
      updateForOptions: this.updateForOptions,
      getForStandard: this.getForStandard,
    }
    console.log(`App.js: render: items = ${this.state.items} sections = ${value.sections}`)
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <header className="App__header">
            <h1>
              <Link to='/'>Check the Fridge</Link>
            </h1>
          </header>

          <ErrorPage>
            <main className="App__main">
              {this.renderMainRoutes()}
            </main>
          </ErrorPage>

          <footer>
            Created by <a href='https://shiningjustice.github.io'>Phoebe Law</a>
          </footer>
        </div>        
      </ApiContext.Provider>
    )
  }
}

export default App;
