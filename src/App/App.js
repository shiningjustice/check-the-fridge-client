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
    sections: [],
    // search: '',
    // filteredFolders: [],
    // sort: '',
    error: null,
  }

  formatQueryParams = params => {
    const queryItems = Object.keys(params).map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    return queryItems.join('&');
  }

  updateForOptions = (search, filteredFolders, sort) => {
    console.log('updateForOptions ran' )
    let params = {};

    //If a instructions are passed into option X, then set params.X
    search && (params.search = search);
    filteredFolders.length > 0 && (params.filteredFolders = filteredFolders);
    sort && (params.sort = sort);

    let queryString = this.formatQueryParams(params);
    const url = `${config.API_ENDPOINT}/items/options?${queryString}`

    fetch(url)
      .then(itemsRes => {
        console.log('got something')
        if (!itemsRes.ok)
          return itemsRes.json().then(e => Promise.reject(e));

        return itemsRes.json()
      })
      .then((items) => {
        this.setState({ items })
        console.log('i fetched')
      })
      .catch(error => console.error({ error }))
     
  }

  renderMainRoutes() {
    return (
      <>
        <Route exact path='/' component={ListView} />
        <Route path='/add-item' component={AddItem} />
      </>
    );
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

  // setSearch = searchTerm => {
  //   this.setState({
  //     search: searchTerm
  //   })
  // }

  // setFilteredFolders = arrOfIds => {
  //   this.setState({
  //     filteredFolders: [...this.state.filteredFolders, arrOfIds]
  //   })
  // }

  // setSort = sortType => {
  //   this.setState({
  //     sort: sortType
  //   })
  // }

  componentDidMount() {
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

  
  render () {
    const value = {
      items: this.state.items,
      sections: this.state.sections,
      search: this.state.search,
      filteredFolders: this.state.filteredFolders,
      sort: this.state.sort,
      error: this.state.error,
      addItem: this.addItem,
      deleteItem: this.deleteItem,
      // setSearch: this.setSearch,
      // setFilteredFolders: this.setFilteredFolders,
      // setSort: this.setSort,
      updateForOptions: this.updateForOptions
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
        </div>        
      </ApiContext.Provider>
    )
  }
}

export default App;
