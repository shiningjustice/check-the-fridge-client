import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import moment from 'moment';

// import config from '../config';
import ItemForm from '../../components/ItemForm/ItemForm'
import ApiContext from '../../contexts/ApiContext';

// const Required = () => (
//   <span className='ItemForm__Required'>*</span>
// )

class EditItem extends Component {
  static contextType = ApiContext;

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

	// setStateForEdit = (name, sectionId, quantity, note,) => {
	// 	this.setState({
	// 		name, sectionId, quantity, note,
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

  // populateForEdit = () => {
	// 	const requiredFields = ['name', 'dateAdded', 'sectionId', 'quantity', 'note'];

  //   for (let i = 0; i > requiredFields.length; i++) {
  //     if (!this.state.requiredFields[i]) {
  //       this.addMissingField(requiredFields[i])
  //     }
  //   }
	// 	// requiredFields.map(field => {
	// 	// 	if (!this.state[field].value) {
	// 	// 		this.addMissingField(field)
	// 	// 	}
	// 	// });
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

	// 	console.log(item)
	// 	this.setState({ error: null });

	// 	fetch(`${config.API_ENDPOINT}/items`, {
	// 		method: 'PATCH',
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
	// 			this.resetState();
	// 			this.context.editItem(data)
	// 			this.props.history.push('/dashboard');
	// 		})
	// 		.catch(error => {
	// 			console.error(error);
	// 			this.setState({ error });
	// 		});
	// };
	



  render() {
    // const { error } = this.state;

    const { items } = this.context;
    // const { sections = [] } = this.context;
    // const { formName } = this.props;

    if (!this.props.match.params.id || items.length === 0) {
      return null
    }

    const itemId = this.props.match.params.id; 
    const item = items.find(item => +item.id === +itemId); 
    // const name = item.name;
    // const sectionId = item.sectionId;
    // const dateAdded = item.dateAdded;
    // const quantity = item.currQuantity;
    // const note = item.note;

  //     return (
  //       <section className={formName}>
  //         <h2>Edit Item</h2>
  //         <form 
  //           className={`EditItem__form`}
  //           onSubmit={(e) => this.handleSubmit(e)}
  //         >
  //           <div className={`EditItem__error`} role='alert'>
  //             {error && <p>{error.message}</p>}
  //             {this.state.missingFields &&
  //               `Please fill out the following required fields and resubmit: ${this.state.missingFields}`}
  //           </div>
            

  //           <div>
  //             <label htmlFor='name'>
  //               Name
  //               <Required />
  //             </label>
  //             {' '}
  //             <input
  //               type='text'
  //               name='name'
  //               id='name'
  //               defaultValue={name && name}
  //               value={this.state.name.value}
  //               onChange={e => this.handleInputChange(e)}
  //               required
  //             ></input>
  //           </div>

  //           <div>
  //             <label htmlFor='sectionId'>
  //               Section
  //               <Required />  
  //             </label>
  //             {' '}
  //             <select
  //               name='sectionId'
  //               id='sectionId'
  //               defaultValue={sectionId && sectionId}
  //               value={this.state.sectionId.value}
  //               onChange={e => this.handleInputChange(e)}
  //               required
  //             >
  //               <option value=''>Select one</option>
  //               {sections.map(section => (
  //                 <option key={section.id} value={section.id}>
  //                   {section.name}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>
            
  //           <div>
  //             <label htmlFor='dateAdded'>
  //               Date Added
  //               <Required />
  //             </label>
  //             {' '}
  //             <input 
  //               type='date'
  //               name='dateAdded'
  //               id='dateAdded'
  //               defaultValue={dateAdded ? moment(dateAdded).format('YYYY-MM-DD') : this.state.dateAdded}
  //               value={this.state.dateAdded.value}
  //               onChange={e => this.handleInputChange(e)}
  //               required
  //             />
  //           </div>

  //           <div>
  //             <label htmlFor='quantity'>
  //               Quantity
  //               <Required />  
  //             </label>
  //             {' '}
  //             <input
  //               type='number'
  //               name='quantity'
  //               id='quantity'
  //               defaultValue={quantity && quantity}
  //               value={this.state.quantity.value}
  //               onChange={e => this.handleInputChange(e)}
  //               required
  //             ></input>
  //           </div>

  //           <div>
  //             <label htmlFor='quantity'>Note</label>
  //             {' '}
  //             <textarea
  //               type='text'
  //               name='note'
  //               id='note'
  //               defaultValue={note && note}
  //               value={this.state.note.value}
  //               onChange={e => this.handleInputChange(e)}
  //             ></textarea>
  //           </div>

  //           <div className={`EditItem__buttonContainer`}>
  //             <button onClick={this.handleClickCancel}>Cancel</button>
  //             {' '}
  //             <button type='submit'>{`Save`}</button>
  //           </div>
  //         </form>
  //       </section>
  //     );
  //   }
  // }
   
    return (
      // <h2>hi</h2>
      <ItemForm
        formName='EditItem'
        history={this.props.history}
        item={item}
      />
    )
  }
}

export default withRouter(EditItem);