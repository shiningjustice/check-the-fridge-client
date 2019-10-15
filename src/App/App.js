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
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/items`),
      fetch(`${config.API_ENDPOINT}/sections`)
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

  render () {
    const value = {
      items: this.state.items,
      sections: this.state.sections,
      addItem: this.addItem,
      deleteItem: this.deleteItem
    }
    // console.log(value.sections, value.items);
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
