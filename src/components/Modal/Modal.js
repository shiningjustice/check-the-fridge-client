import React, { Component } from 'react';
import config from '../../config';
import './Modal.css';

export default class Modal extends Component {
  handleClose = () => this.props.toggleShow(false);
  handleShow = () => this.props.toggleShow(true)

  handleSubmit = () => {
    const { name, email } = this.state;
    const signup = { name, email };

    fetch(config.API__ENDPOINT + '/signups', {
      method: 'POST',
      body: JSON.stringify(signup),
      headers: {
        "Authorization": `Bearer ${config.API_TOKEN}`,
        "Content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
      })
      .then(() => {
        this.setState({
          name: '',
          email: ''
        })
      })
      .catch(error => {
        console.error(error)
      });
  }

  // handleChange = e => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   this.setState({
  //     [name]: value
  //   })
  // }
  
  render = () => {
    if (!this.props.show) {
      return null;
    } 

    return (
      <div className='Modal__div mainContainer'>
        <header className='Modal__header'>
        <button className='Modal__button close' onClick={() => this.props.toggleShow(false)}>{this.props.closeIcon}</button>
        </header>
        <h3>Almost, But Not Quite Yet</h3>
        <form className='Modal__form' onSubmit={(e) => this.handleSubmit(e)}>
          <p>Thanks for your interest! We've still beta testing this app, but we can notify you when it's ready:</p>

          <div className='Modal__div inputs'>
            <div className='Modal__div inputAndLabel'>
              <label className='Modal__label italic' htmlFor='firstName'>First Name</label>{' '}
              <input className='Modal__input' type='text' placeholder="Rosemary Trout" onChange={e => this.handleChange(e)} required/>
            </div>
            
            <div className='Modal__div inputAndLabel'>
              <label className='Modal__label italic' htmlFor='email'>Email</label>{' '}
              <input className='Modal__input' type='email' placeholder='itssherbertday@goshawty.com' onChange={e => this.handleChange(e)} required/>
            </div>
          </div>
          
          <button className='Modal__button submit' type='submit' alt='This is the submit button'>Godspeed, devs</button>
        </form>
      </div>

    )
  }
}