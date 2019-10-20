import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import config from '../config';
import ApiContext from '../ApiContext';

import './ItemForm.css'

const Required = () => (
  <span className='ItemForm__Required'>*</span>
)

export default class ItemForm extends Component {  

  static contextType = ApiContext;

  state = {
		error: null,
		name: '', 
		sectionId: '',
		quantity: '',
		note: '',
  };
  
  handleInputChange = e => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		console.log(name, value)
		this.setState({
			[name]: value
		});
  }
  
	resetState = () => {
		this.setState({
			error: null,
			name: '', 
			sectionId: '',
			quantity: '',
      note: '',
      missingFields: [],
		})
	}

  handleClickCancel = () => {
		this.resetState();
		this.props.history.push('/dashboard');
  };

  addMissingField = field => {
    this.setState({
      missingFields: [...this.state.missingFields, field]
    });
  }

  validateOnSubmit = () => {
		const requiredFields = ['name', 'sectionId', 'quantity'];

    for (let i = 0; i > requiredFields.length; i++) {
      if (!requiredFields[i]) {
        this.addMissingField(requiredFields[i])
      }
    }
		// requiredFields.map(field => {
		// 	if (!this.state[field].value) {
		// 		this.addMissingField(field)
		// 	}
		// });
  };
  
  handleAddSubmit = e => {
		e.preventDefault();

		this.validateOnSubmit();

		const item = {
			name: this.state.name,
			sectionId: this.state.sectionId,
			quantity: this.state.quantity,
			note: this.state.note
		};
		console.log(item)
		this.setState({ error: null });

		fetch(`${config.API_ENDPOINT}/items`, {
			method: "POST",
			body: JSON.stringify(item),
			headers: {
				"content-type": "application/json"
			},
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(e => Promise.reject(e));
				}
				return res.json();
      })
			.then(data => {
				this.resetState();
				this.props.formName === 'addItem' ? this.context.addItem(data) : this.context.editItem(data)
				this.props.history.push('/dashboard');
			})
			.catch(error => {
				console.error(error);
				this.setState({ error });
			});
  };
  
  render() {
    const { error } = this.state;
    const { sections = [] } = this.context;
    const { formName, formVerb } = this.props;

		const { item } = this.props;
		
		console.log(item)
    // const name = item.name;
    // const sectionId = item.sectionId;
    // const quantity = item.quantity;
    // const note = item.note;

		console.log(item)
		
    return (
			<section className={formName}>
				<h2>{formVerb} Item</h2>
				<form 
					className={`${formName}__form`}
          onSubmit={(formName === 'Add')
            ? e => this.handleAddSubmit(e)
            : e => this.handleEditSubmit(e)
          }
				>
					<div className={`${formName}__error`} role='alert'>
            {error && <p>{error.message}</p>}
            {this.state.missingFields &&
							`Please fill out the following required fields and resubmit: ${this.state.missingFields}`}
					</div>
					

					<div>
						<label htmlFor='name'>
              Name
              <Required />
            </label>
						{' '}
						<input
							type='text'
							name='name'
              id='name'
              // defaultValue={name && name}
							value={this.state.name.value}
							onChange={e => this.handleInputChange(e)}
							required
						></input>
					</div>

					<div>
						<label htmlFor='sectionId'>
              Section
              <Required />  
            </label>
						{' '}
						<select
							name='sectionId'
							id='sectionId'
							value={this.state.sectionId.value}
							onChange={e => this.handleInputChange(e)}
							required
						>
							<option value=''>Select one</option>
							{sections.map(section => (
								<option key={section.id} value={section.id}>
									{section.name}
								</option>
							))}
						</select>
					</div>
					
					<div>
						<label htmlFor='quantity'>
              Quantity
              <Required />  
            </label>
						{' '}
						<input
							type='number'
							name='quantity'
							id='quantity'
							value={this.state.quantity.value}
							onChange={e => this.handleInputChange(e)}
							required
						></input>
					</div>

					<div>
						<label htmlFor='quantity'>Note</label>
						{' '}
						<textarea
							type='text'
							name='note'
							id='note'
							value={this.state.note.value}
							onChange={e => this.handleInputChange(e)}
						></textarea>
					</div>

					<div className={`${formName}__buttonContainer`}>
            <button onClick={this.handleClickCancel}>Cancel</button>
            {' '}
            <button type='submit'>{`Save`}</button>
					</div>
				</form>
			</section>
		);
  }
}
 