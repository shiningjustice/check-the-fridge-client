import React, { Component } from 'react';
import moment from 'moment';

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
		id: '',
		name: '', 
		sectionId: '',
		dateAdded: moment().format('YYYY-MM-DD'),
		quantity: '',
		note: '',
  };
  
  handleInputChange = e => {
		let value = e.target.value;
		let name = e.target.name;

		//if the section is supposed to be a type===number then make sure it is
		(name === 'sectionId') && (value = +value)
		
		this.setState({
			[name]: value
		});
  }
  
	resetState = () => {
		this.setState({
			error: null,
			name: '', 
			sectionId: '',
			dateAdded: moment().format('YYYY-MM-DD'),
			quantity: '',
      note: '',
      missingFields: [],
		})
	}

  handleClickCancel = () => {
		this.resetState();
		this.props.history.push('/demo');
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
  
  handleSubmit = (e) => {
		e.preventDefault();

		this.validateOnSubmit();

		const item = {
			name: this.state.name,
			sectionId: +this.state.sectionId,
			dateAdded: moment(this.state.dateAdded).format(),
			currQuantity: +this.state.quantity,
			note: this.state.note,
			id: this.state.id
		};

		this.setState({ error: null });

		//Format fetch call based on form
		this.props.formName === 'AddItem' ? this.handlePost(item) : this.handlePatch(item);
		
	};

	handlePost = item => {
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
				this.context.addItem(data)
				this.props.history.push('/demo');
			})
			.catch(error => {
				console.error(error);
				this.setState({ error });
			});
	}

	handlePatch = item => {
		fetch(`${config.API_ENDPOINT}/items/${this.state.id}`, {
			method: "PATCH",
			body: JSON.stringify(item),
			headers: {
				"content-type": "application/json"
			},
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(e => Promise.reject(e));
				}
				return res;
      })
			.then(() => {
				this.resetState();
				this.context.editItem(item)
				this.props.history.push('/demo');
			})
			.catch(error => {
				console.error(error);
				this.setState({ error });
			});
	}

	componentDidMount = () => {
		const { item } = this.props;

		if (item) {
			this.setState({
				id: item.id,
				name: item.name, 
				sectionId: item.sectionId,
				dateAdded: moment(item.dateAdded).format('YYYY-MM-DD'),
				quantity: item.currQuantity,
				note: item.note,
			})
		}
  };

  render() {
    const { error } = this.state;
    const { sections = [] } = this.context;
		const { formName } = this.props;
		// const { item } = this.props;
		
		// let name; let sectionId; let dateAdded; let quantity; let note;
		
		// if (item) {
		// 	name = item.name;
		// 	sectionId = item.sectionId;
		// 	dateAdded = item.dateAdded;
		// 	quantity = item.currQuantity;
		// 	note = item.note;
		// }
		
    return (
			<section className={formName}>
				<h2>{this.props.formName === 'AddItem' ? 'Add' : 'Edit'} Item</h2>
				<form 
					className={`${formName}__form`}
          onSubmit={(e) => this.handleSubmit(e)}
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
              defaultValue={this.state.name}
							// value={this.state.name.value}
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
							defaultValue={this.state.sectionId}
							// value={this.state.sectionId.value}
							onChange={e => this.handleInputChange(e)}
							required
						>
							<option value=''>Select one</option>
							{sections.map(section => {
								return (
									<option type='number' key={Number(section.id)} value={Number(section.id)}>
									{section.name}
									</option>
								)
							})}
						</select>
					</div>
					
					<div>
						<label htmlFor='dateAdded'>
							Date Added
							<Required />
						</label>
						{' '}
						<input 
							type='date'
							name='dateAdded'
							id='dateAdded'
							defaultValue={this.state.dateAdded}
							// value={this.state.dateAdded.value}
							onChange={e => this.handleInputChange(e)}
							required
						/>
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
							defaultValue={this.state.quantity}
							// value={this.state.quantity.value}
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
							defaultValue={this.state.note}
							// value={this.state.note.value}
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
 