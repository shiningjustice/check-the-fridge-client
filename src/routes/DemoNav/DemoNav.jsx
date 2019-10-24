import React from "react";
import { Link } from "react-router-dom";

import Options from "../../components/Options/Options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import './DemoNav.css';

const DemoNav = props => {
	return (
		<div className='DemoNav__div mainContainer'>
      <Options parent='DemoNav' />
      <Link to='/demo/add-item' className='DemoNav__Link'>
        <FontAwesomeIcon icon={faPlusCircle} />{' '}<span className='notMobile'>Add Item</span>
      </Link>
		</div>
	);
};

export default DemoNav;
