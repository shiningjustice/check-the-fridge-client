import React from 'react';

export default function ValidationError(props) {
  if (props) {
    return (
      <div className='error'>{`Item ${props} is required`}</div>
    )
  }
  
  return;
}