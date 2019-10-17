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

  updateForOptions = (search, filteredFolders) => {
    console.log('updateForOptions ran' )
    console.log(`in app, search = ${search} and filteredFolders = ${filteredFolders}`)
    let params = {};

    //If search options are passed into option X, then set params.X
    (filteredFolders.length > 0) && (params.filteredFolders = filteredFolders);
    let queryString = this.formatQueryParams(params);
    console.log(queryString)

    const url = `${config.API_ENDPOINT}/results?${queryString}`

    fetch(url)
      .then(itemsRes => {
        if (!itemsRes.ok)
          return itemsRes.json().then(e => Promise.reject(e));

        return itemsRes.json()
      })
      .then((items) => {
        this.setState({
          items,
          sections: this.state.sections.filter(section => {
            return section.id === this.state.items.find(item => item.sectionId)
          }), 
          search: '', 
        })
        console.log(this.state.items)
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

  setSections = sections => {
    this.setState({ sections })
  }

  setItems = items => {
    this.setState({ items })
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
      setItems: this.setItems,
      updateForOptions: this.updateForOptions,
      getForStandard: this.getForStandard,
    }
    console.log(`search: ${value.search}, folders: ${value.filteredFolders}, sort: ${value.sort}`);
    console.log(value.items)
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
