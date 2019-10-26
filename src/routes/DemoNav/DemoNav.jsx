import React from "react";
import { Link } from "react-router-dom";

import Options from "../../components/Options/Options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import './DemoNav.css';

const DemoNav = props => {
	return (
		<div className='DemoNav__div mainContainer'>
      <Link to='/demo'><span className='DemoNav__span laptop'>Fridg·u·Dare</span></Link>
      <Options parent='DemoNav' />
      <Link to='/demo/add-item' className='DemoNav__Link addItem'>
        <FontAwesomeIcon icon={faPlusCircle} />{' '}<span className='notMobile'>Add Item</span>
      </Link>
		</div>
	);
};

export default DemoNav;
