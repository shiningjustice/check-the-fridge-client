import React, { Component } from 'react';

import ApiContext from '../ApiContext';

export default class EditItem extends Component {
	static contextType = ApiContext;

  state = {
		error: null,
		name: '', 
		sectionId: '',
		quantity: '',
		note: '',
  };
  
  render() {
    return(
      <div className={`EditItem__div ${this.props.className}`}>

      </div>
    )
  }
}