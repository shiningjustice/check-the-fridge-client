/*******************************************************************
	IMPORTS
*******************************************************************/
//Libraries
import React, { Component } from 'react';
import moment from 'moment';
// Contexts and services
import ApiContext from '../../contexts/ApiContext';
import ItemsApiService from '../../services/items-api-service';
// CSS
import './ItemForm.css'

// Other Components
const Required = () => (
  <span className='ItemForm__Required'>*</span>
)

/*******************************************************************
	`ItemForm` COMPONENT
*******************************************************************/
export default class ItemForm extends Component {  
	// Context
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

  addMissingField = field => {
    this.setState({
      missingFields: [...this.state.missingFields, field]
    });
  }

  validateOnSubmit = () => {
		const requiredFields = ['name', 'dateAdded','sectionId', 'quantity'];

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
	
	/*******************************************************************
    HANDLER FUNCTIONS
  *******************************************************************/
	handleInputChange = e => {
		let value = e.target.value;
		let name = e.target.name;
		
		this.setState({
			[name]: value
		});
	}
	
	handleClickCancel = e => {
		e.preventDefault();
		this.resetState();
		this.props.history.push('/demo');
  };
  
	
  handleSubmit = e => {
		e.preventDefault();

		this.validateOnSubmit();

		const { name, sectionId, dateAdded, quantity, note, id } = this.state;
		let item = {
			name,
			sectionId: +sectionId,
			quantity,
			dateAdded: moment(dateAdded).format(),
			note,
			id
		};

		this.setState({ error: null });

		//Choose fetch call based on form
		(this.props.formName === 'AddItem') ? this.handlePost(item) : this.handlePatch(item);
	};

	handlePost = item => {
		ItemsApiService.postItem(item)
			.then(data => {
				this.resetState();
				this.context.addItem(data)
				this.props.history.push('/demo');
			})
			.catch(error => this.setState({ error: error.error}))
	}

	handlePatch = item => {
		ItemsApiService.patchItem(item, this.state.id)
			.then(() => {
				this.resetState();
				this.context.editItem(item)
				this.props.history.push('/demo');
			})
			.catch(error => this.setState({ error: error.error}))
	}

	/*******************************************************************
    LIFECYCLE METHODS
  *******************************************************************/
	componentDidMount = () => {
		// Set up form to submit on enter keypress
		window.addEventListener("keypress", this.handlePressEnter);

		const { item } = this.props;

		if (item) {
			this.setState({
				id: item.id,
				name: item.name, 
				sectionId: (item.sectionId).toString(),
				dateAdded: moment(item.dateAdded).format('YYYY-MM-DD'),
				quantity: item.currQuantity,
				note: item.note,
			})
		}
	};
	
	componentWillUnmount = () => {
		// Remove listerner that sets up form to submit on keypress of enter key
		window.removeEventListener("keypress", this.handlePressEnter);
	};

	/*******************************************************************
    RENDER
  *******************************************************************/
  render() {
		const { error } = this.state;
    const { sections = [] } = this.context;
		const { formName } = this.props;

    return (
			<section className={`${formName}__section mainContainer`}>
				<h2>{this.props.formName === 'AddItem' ? 'Add' : 'Edit'} Item</h2>
				<form 
					className={`${formName}__form`}
          onSubmit={(e) => this.handleSubmit(e)}
				>
					<div className={`${formName}__error`} >
            {error && error.message}
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
							onChange={e => this.handleInputChange(e)}
							autoFocus
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
							value={this.state.sectionId}
							onChange={e => this.handleInputChange(e)}
							className={`${formName}__select`}
							required
						>
							<option value=''>Select one</option>
							{sections.map(section => {
								return (
									<option key={section.id} value={section.id}>
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
							value={this.state.dateAdded}
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
							onChange={e => this.handleInputChange(e)}
							required
						></input>
					</div>

					<div>
						<label htmlFor='note'>Note</label>
						{' '}
						<textarea
							type='text'
							name='note'
							id='note'
							defaultValue={this.state.note}
							onChange={e => this.handleInputChange(e)}
							className={`${formName}__textarea`}
						></textarea>
					</div>

					<div className={`${formName}__buttonContainer`}>
            <button onClick={e => this.handleClickCancel(e)}>Cancel</button>
            {' '}
            <button type="submit">{`Save`}</button>
					</div>
				</form>
			</section>
		);
  }
}
 