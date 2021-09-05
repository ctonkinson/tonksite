import React from 'react';
import './Loading.scss';
import logo from './../../assets/images/logo.png';

class Loading extends React.Component {

	render() {
		return <div className="loading-layout">
			<div className="loading-content">
				<div className="logo-content">
					<img className="logo" src={logo} alt="logo" />
	                <div>TONK</div>
	            </div>
				<div className="loading-bar"></div>
			</div>
		</div>
		}
	}

export default Loading;