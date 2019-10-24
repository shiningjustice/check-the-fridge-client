import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ItemForm from '../../components/ItemForm/ItemForm'
import ApiContext from '../../contexts/ApiContext';

// const Required = () => (
//   <span className='ItemForm__Required'>*</span>
// )

class EditItem extends Component {
  static contextType = ApiContext;

  render() {
    const { items } = this.context;

    if (!this.props.match.params.id || items.length === 0) {
      return null
    }

    const itemId = this.props.match.params.id; 
    const item = items.find(item => +item.id === +itemId); 
   
    return (
      <ItemForm
        formName='EditItem'
        history={this.props.history}
        item={item}
      />
    )
  }
}

export default withRouter(EditItem);