import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import moment from 'moment';

import HomeMain from './HomeMain/HomeMain';
import HomeNav from './HomeNav/HomeNav';
import DemoMain from './DemoMain/DemoMain';
import DemoSubNav from './DemoSubNav/DemoSubNav';
import DemoNav from './DemoNav/DemoNav';
import AddItem from './AddItem/AddItem';
import EditItem from './EditItem/EditItem';
import config from './config';
import ApiContext from './ApiContext';

import ErrorPage from './ErrorPage';

import './App.css';

class App extends Component {
  state = {
    items: [],
    sections: [],
    search: '',
    sort: '',
    searchOn: true,
    currentItemId: '',
    error: null,
  }

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

  addItem = newitem => {
    this.setState({
      items: [...this.state.items, newitem]
    })
  }

  editItem = editedItem => {
    //find the ID of the item being updated
    const index = this.state.items.findIndex(item => item.id === editedItem.id)
    
    console.log(editedItem, index)
    
    //splice the older version and replace it with the new one 
    let newItems = this.state.items;
    newItems.splice(index, 1, editedItem);

    console.log(newItems)

    this.setState({
      items: newItems
    })
  }

  deleteItem = itemId => {
    const newItems = this.state.items.filter(item => item.id !==itemId);
    this.setState({
      items: newItems
    })
  }

  setCurrentItemId = id => {
    this.setState({
      currentItemId: id
    })
  }

  renderSubNavRoutes() {
    return (
      <Route exact path='/demo' component={DemoSubNav} />
    )
  }
  renderNavRoutes() {
    return (
      <>
        <Route exact path='/' component={HomeNav} />
        <Route path='/demo' component={DemoNav} />
      </>
    )
  }
  renderMainRoutes() {
    return (
      <>
        <Route exact path='/' component={HomeMain} />
        <Route exact path='/demo' component={DemoMain} />
        <Route path='/demo/add-item' component={AddItem} />
        <Route path='/demo/edit-item/:id' component={EditItem} />
      </>
    );
  }

  componentDidMount() {
    this.getForStandard();
  }

  
  render () {
    const value = {
      state: this.state,
      items: this.state.items,
      sections: this.state.sections,
      currentItemId: this.state.currentItemId,
      search: this.state.search,
      searchOn: true,
      error: this.state.error,
      addItem: this.addItem,
      editItem: this.editItem,
      deleteItem: this.deleteItem,
      setCurrentItemId: this.setCurrentItemId,
      updateForOptions: this.updateForOptions,
      getForStandard: this.getForStandard,
    }

    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}{' '}
            {this.renderSubNavRoutes()}
          </nav>
          
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

          <footer className='App__footer'>
            Created by <a href='https://shiningjustice.github.io'>Phoebe Law</a>
          </footer>
        </div>        
      </ApiContext.Provider>
    )
  }
}

export default App;
