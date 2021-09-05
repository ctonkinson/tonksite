import React from 'react';
import './Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Siderbar extends React.Component {

	goToLink = (link) => {
		this.props.action(link);
  	}

	render() {
		return <div className="sidebar">
			<div className="sidebar-logo"><a href="/">T<span>TONK</span></a></div>
			<ul className="sidebar-nav">
				<li><div className="sidebar-nav-link" onClick={() => this.goToLink('home')}><FontAwesomeIcon icon="home" /><span>Home</span></div></li>
				<li><div className="sidebar-nav-link" onClick={() => this.goToLink('about')}><FontAwesomeIcon icon="user" /><span>About</span></div></li>
				<li><div className="sidebar-nav-link" onClick={() => this.goToLink('skills')}><FontAwesomeIcon icon="cog" /><span>Skills</span></div></li>
				<li><div className="sidebar-nav-link" onClick={() => this.goToLink('contact')}><FontAwesomeIcon icon="envelope" /><span>Contact</span></div></li>
			</ul>
			<ul className="sidebar-social">
				<li><a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/tonkinson"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a></li>
				<li><a rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/carolinetonkinson/"><FontAwesomeIcon icon={['fab', 'instagram']} /></a></li>
				<li><a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/carolinetonkinson/"><FontAwesomeIcon icon={['fab', 'linkedin']} /></a></li>
			</ul>
		</div>
		}
	}

export default Siderbar;