import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from '../config';
import ApiContext from '../ApiContext';
// import ValidationError from '../validateField';

export default class Form extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired
	};

	static contextType = ApiContext;

	state = {
    error: null,
    missingFields: '',
		name: {
      value: '',
      touched: false
    },
    sectionId: {
      value: '',
      touched: false
    },
		quantity: {
      value: '',
      touched: false
    },
		note: {
      value: '',
      touched: false
    },
	};

	handleClickCancel = () => {
		this.props.history.push('/');
	};

	handleAddItem = e => {
		e.preventDefault();

		this.setState({ error: null });

    this.validateOnSubmit();

    const item = {
      name: this.state.name.value, 
      sectionId: this.state.sectionId.value, 
      quantity: this.state.quantity.value, 
      note: this.state.note.value, 
    }

		fetch(`${config.API_ENDPOINT}/items`, {
      method: "POST",
			headers: {
				"content-type": "application/json"
      },
      body: JSON.stringify(item)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return res.json();
      })
      .then(data => {
        this.context.addItem(data)
        this.props.history.push('/');
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
	};

	getItemName = e => {
		this.setState({ 
      name: {
        value: e.target.value,
        touched: true
      } 
    });
	};

	getItemQuantity = e => {
		this.setState({ 
      quantity: {
        value: e.target.value,
        touched: true
      } 
    });
	};

	getItemSectionId = e => {
		this.setState({
      sectionId: {
        value: e.target.value,
        touched: true
      } 
    });
	};

	getItemNote = e => {
		this.setState({
      note: {
        value: e.target.value,
        touched: true
      } 
    });
  };

  validateOnSubmit = () => {
    const requiredFields = ['name', 'sectionId', 'quantity'];

    requiredFields.forEach(field => {
      if (!this.state[field].value) {
        this.setState({
          missingFields: [...this.state.missingFields, field]
        })
      }
    })
  }
  
  validateIfTouched = (fieldName) => {
    const value = this.state[fieldName].value;

    if (!value) {
      return <p className="ValidationError">This field is required</p>
    } else {
      return null
    }
  }

  //when adding update form, make sure to include 'default-value for set state and set state to values of the thing'

  
	render() {
    const { sections = [] } = this.context;
		return (
			<form className='AddItem__form' onSubmit={e => this.handleAddItem(e)}>

        <p className="error__p">{this.state.missingFields && `Please fill out the following required fields and resubmit: ${this.state.missingFields}`}</p>
				<label>Name</label>
        {this.state.name.touched && this.validateIfTouched('name')}
				<input
					type='text'
					id='name'
          value={this.state.name.value}
					onChange={this.getItemName}
					required
				></input>

				<label htmlFor='sectionId'>Section</label>
        {this.state.sectionId.touched && this.validateIfTouched('sectionId')}
				<select
					name='sectionId'
					id='select-section'
          value={this.state.sectionId.value}
					onChange={this.getItemSectionId}
					required
				>
					<option value=''>Select a section</option>
					{sections.map(section => (
						<option key={section.id} value={section.id}>{section.name}</option>
					))}
				</select>

				<label>Quantity</label>
        {this.state.quantity.touched && this.validateIfTouched('quantity')}
				<input
					type='number'
					id='quantity'
          value={this.state.quantity.value}
					onChange={this.getItemQuantity}
					required
				></input>

				<label>Note</label>
        {/* Optional field; no validation needed */}
				<textarea
					type='text'
					id='note'
          value={this.state.note.value}
					onChange={this.getItemNote}
				></textarea>

				<button onClick={this.handleClickCancel}>Cancel</button>
				<button type='submit'>Add Item</button>
			</form>
		);
	}
}
