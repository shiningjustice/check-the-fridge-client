import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Modal from '../Modal/Modal';

import HomeNav from '../../routes/HomeNav/HomeNav';
import DemoMain from '../../routes/DemoMain/DemoMain';
import DemoNav from '../../routes/DemoNav/DemoNav';
import DemoBanner from '../../routes/DemoBanner/DemoBanner';
import AddItem from '../../routes/AddItem/AddItem';
import EditItem from '../../routes/EditItem/EditItem';
import ResultsApiService from '../../services/results-api-service';
import ItemsApiService from '../../services/items-api-service';
import SectionsApiService from '../../services/sections-api-service';
import ApiContext from '../../contexts/ApiContext';
import ErrorPage from '../ErrorPage';
import HomeMain from '../../routes/HomeMain/HomeMain';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './App.css';

class App extends Component {
  state = {
    fridge: [],
    items: [],
    sections: [],
    search: '',
    sort: '',
    currentItemId: '',
    error: null,
    showModal: false,
  }

  toggleShowModal = boolean => {
    this.setState({ showModal: boolean })
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
    let params = {};

    //If search options are passed into option X, then set params.X
    search && (params.search = search);
    (filteredFolders.length > 0) && (params.filteredFolders = filteredFolders);
    sort && (params.sort = sort);

    let queryString = this.formatQueryParams(params);

    ResultsApiService.getFridgeItemsWithQuery(queryString)
      .then((items) => {

        const { fridge, sections } = this.createFridge(items, this.state.sections)

        //If section doesn't have any items in it, don't display it in 
        // the main "Fridge" component (normally you display it but make 
        // note that it's empty) and don't display it as a checkbox (`sectionsToDisplay`)
        
        fridge.map((section, index) => {
          if (section.sectionItems.length === 0) {
            section.display = false;
            sections[index].display = false;
          }
        })
        
        this.setState({
          fridge,
          items,
          sections,
          search: '', 
        })
      })
      .catch(error => console.error(error))
  }

  getFridgeItemsAndSections = () => {
    //reset state
    this.setState({
      items: [],
      sections: [],
      sort: '',
      search: false,
      error: null,
    })

    Promise.all([
      ItemsApiService.getItems(), 
      SectionsApiService.getSections(),
    ])
      .then(([items, sections]) => {        
        //Create array fridge to store organized items and sections
        const { fridge } = this.createFridge(items, sections);

        this.setState({ items, sections, fridge })
      })
      .catch(error => console.error(error))
  }

  createFridge = (items, sections) => {
    //Create array fridge to store organized items and sections
    const fridge = [];
    sections.map(section => {
      fridge.push(
        {
          sectionId: section.id,
          sectionName: section.name,
          sectionItems: [],
          display: true,
        }
      )
      section.display = true
    });
    items.map(item => fridge[item.sectionId - 1].sectionItems.push(item));
    return { fridge, sections };
  }
  
  addItem = newitem => {
    this.setState({
      items: [...this.state.items, newitem]
    })
  }

  editItem = editedItem => {
    //change 'quantity' to curQuantity
    editedItem.currQuantity = editedItem.quantity;
    delete editedItem.quantity;
    
    //find the ID of the item being updated
    const index = this.state.items.findIndex(item => item.id === editedItem.id)
    
    //splice the older version and replace it with the new one 
    let newItems = this.state.items;
    newItems.splice(index, 1, editedItem);

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

  renderNavRoutes() {
    return (
      <>
        <Route exact path='/' component={() => <HomeNav toggleShow={this.toggleShowModal} />}/>
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
    this.getFridgeItemsAndSections();
  }

  
  render () {
    const value = {
      fridge: this.state.fridge,
      items: this.state.items,
      sections: this.state.sections,
      currentItemId: this.state.currentItemId,
      search: this.state.search,
      error: this.state.error,
      addItem: this.addItem,
      editItem: this.editItem,
      deleteItem: this.deleteItem,
      setCurrentItemId: this.setCurrentItemId,
      updateForOptions: this.updateForOptions,
      getFridgeItemsAndSections: this.getFridgeItemsAndSections,
      showModal: this.showModal,
    }
    const closeIcon = <FontAwesomeIcon icon={faTimes} />

    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <div className='App___sansFooter beans'>
            <nav className='App__nav'>
              {this.renderNavRoutes()}{' '}
              <Route path='/demo' component={() => <DemoBanner toggleShow={this.toggleShowModal} />} />
            </nav>

            <ErrorPage>
              <main className="App__main">
                {this.renderMainRoutes()}
              </main>
            </ErrorPage>
            <Modal show={this.state.showModal} closeIcon={closeIcon} toggleShow={this.toggleShowModal}/>    
          </div>

          <footer className='App__footer'>
            <p className='footer__p'>Created by <a href='https://shiningjustice.github.io' target="_blank" rel="noopener noreferrer">Phoebe Law</a></p>
          </footer>
        </div>     
      </ApiContext.Provider>
    )
  }
}

export default App;
