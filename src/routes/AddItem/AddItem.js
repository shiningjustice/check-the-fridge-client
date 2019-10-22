import React from 'react';
// import moment from 'moment';

// import config from '../config';
// import ApiContext from '../ApiContext';

import ItemForm from '../../components/ItemForm/ItemForm';

// const Required = () => (
//   <span className='ItemForm__Required'>*</span>
// )

export default function AddItem (props) {
	
	// static contextType = ApiContext;

  // state = {
	// 	error: null,
	// 	name: '', 
	// 	sectionId: '',
	// 	dateAdded: moment().format('YYYY-MM-DD'),
	// 	quantity: '',
	// 	note: '',
  // };
  
  // handleInputChange = e => {
	// 	const target = e.target;
	// 	const value = target.type === 'checkbox' ? target.checked : target.value;
	// 	const name = target.name;

	// 	console.log(name, value)
	// 	this.setState({
	// 		[name]: value
	// 	});
  // }
  
	// resetState = () => {
	// 	this.setState({
	// 		error: null,
	// 		name: '', 
	// 		sectionId: '',
	// 		dateAdded: moment().format('YYYY-MM-DD'),
	// 		quantity: '',
  //     note: '',
  //     missingFields: [],
	// 	})
	// }

  // handleClickCancel = () => {
	// 	this.resetState();
	// 	this.props.history.push('/dashboard');
  // };

  // addMissingField = field => {
  //   this.setState({
  //     missingFields: [...this.state.missingFields, field]
  //   });
  // }

  // validateOnSubmit = () => {
	// 	const requiredFields = ['name', 'sectionId', 'quantity'];

  //   for (let i = 0; i > requiredFields.length; i++) {
  //     if (!requiredFields[i]) {
  //       this.addMissingField(requiredFields[i])
  //     }
  //   }
		// requiredFields.map(field => {
		// 	if (!this.state[field].value) {
		// 		this.addMissingField(field)
		// 	}
		// });
  // };
  
  // handleSubmit = (e) => {
	// 	e.preventDefault();

	// 	this.validateOnSubmit();

	// 	const item = {
	// 		name: this.state.name,
	// 		sectionId: this.state.sectionId,
	// 		dateAdded: moment(this.state.dateAdded).format(),
	// 		quantity: this.state.quantity,
	// 		note: this.state.note
	// 	};

	// 	this.setState({ error: null });

	// 	fetch(`${config.API_ENDPOINT}/items`, {
	// 		method: "POST",
	// 		body: JSON.stringify(item),
	// 		headers: {
	// 			"content-type": "application/json"
	// 		},
	// 	})
	// 		.then(res => {
	// 			if (!res.ok) {
	// 				return res.json().then(e => Promise.reject(e));
	// 			}
	// 			return res.json();
  //     })
	// 		.then(data => {
	// 			this.context.addItem(data)
	// 			this.props.history.push('/dashboard');
	// 		})
	// 		.catch(error => {
	// 			console.error(error);
	// 			this.setState({ error });
	// 		});
	// };
	

//   render() {
//     const { error } = this.state;
//     const { sections = [] } = this.context;
		
//     return (
// 			<section className='AddItem__section'>
// 				<h2>Add Item</h2>
// 				<form 
// 					className={`AddItem__form`}
//           onSubmit={(e) => this.handleSubmit(e)}
// 				>
// 					<div className={`$AddItem__error`} role='alert'>
//             {error && <p>{error.message}</p>}
//             {this.state.missingFields &&
// 							`Please fill out the following required fields and resubmit: ${this.state.missingFields}`}
// 					</div>
					

// 					<div>
// 						<label htmlFor='name'>
//               Name
//               <Required />
//             </label>
// 						{' '}
// 						<input
// 							type='text'
// 							name='name'
//               id='name'
// 							value={this.state.name.value}
// 							onChange={e => this.handleInputChange(e)}
// 							required
// 						></input>
// 					</div>

// 					<div>
// 						<label htmlFor='sectionId'>
//               Section
//               <Required />  
//             </label>
// 						{' '}
// 						<select
// 							name='sectionId'
// 							id='sectionId'
// 							value={this.state.sectionId.value}
// 							onChange={e => this.handleInputChange(e)}
// 							required
// 						>
// 							<option value=''>Select one</option>
// 							{sections.map(section => (
// 								<option key={section.id} value={section.id}>
// 									{section.name}
// 								</option>
// 							))}
// 						</select>
// 					</div>
					
// 					<div>
// 						<label htmlFor='dateAdded'>
// 							Date Added
// 							<Required />
// 						</label>
// 						{' '}
// 						<input 
// 							type='date'
// 							name='dateAdded'
// 							id='dateAdded'
// 							value={this.state.dateAdded.value}
// 							defaultValue={this.state.dateAdded}
// 							onChange={e => this.handleInputChange(e)}
// 							required
// 						/>
// 					</div>

// 					<div>
// 						<label htmlFor='quantity'>
//               Quantity
//               <Required />  
//             </label>
// 						{' '}
// 						<input
// 							type='number'
// 							name='quantity'
// 							id='quantity'
// 							value={this.state.quantity.value}
// 							onChange={e => this.handleInputChange(e)}
// 							required
// 						></input>
// 					</div>

// 					<div>
// 						<label htmlFor='quantity'>Note</label>
// 						{' '}
// 						<textarea
// 							type='text'
// 							name='note'
// 							id='note'
// 							value={this.state.note.value}
// 							onChange={e => this.handleInputChange(e)}
// 						></textarea>
// 					</div>

// 					<div className={`AddItem__buttonContainer`}>
//             <button onClick={this.handleClickCancel}>Cancel</button>
//             {' '}
//             <button type='submit'>{`Save`}</button>
// 					</div>
// 				</form>
// 			</section>
// 		);
//   }
// }

	return (
		<ItemForm
			formName='AddItem'
			history={props.history}
		/>
	)
}