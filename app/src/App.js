import React, { Component } from 'react';
import './App.scss';
import './assets/fonts/whitney.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Home from './components/home/Home.js';
import Page from './components/page/Page.js';
import logo from './assets/images/logo.png';
import Axios from "axios";
import DelayLink from 'react-delay-link';
import ReactGA from 'react-ga';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

const siteUrl = 'https://tonk.uk'


class App extends Component {
    constructor (props){
        super(props)
        this.state = {
            links: [],
            slugs: [],
            socialLinks: [],
            activeClass: 'outer-container',
            toggleClass: 'mobile-menu-toggle-inner',
            mobileMenuClass: 'sidebar-nav mobile-menu'
        }
        localStorage.setItem('history', 'not-set')
    }
    componentDidMount() {   
        this.getMenu()
        this.getSocial()
        this.getPages()
        ReactGA.initialize('UA-163615934-1')
    }
    getMenu (){
        let self = this;
        Axios.get(siteUrl + '/wp-json/tonk/v2/menu')
            .then(res => {
                this.setState({links : res.data})
            })
    }
    getPages (){
        let self = this;
        Axios.get(siteUrl + '/wp-json/wp/v2/pages/')
            .then(res => {
                this.setState({slugs : res.data})
            })
    }
    getSocial (){
        let self = this;
        Axios.get(siteUrl + '/wp-json/tonk/v2/social')
            .then(res => {
                this.setState({socialLinks : res.data});
            })
    }
    toggleMenu = () => {
        if(this.state.toggleClass === 'mobile-menu-toggle-inner') {
            this.setState({toggleClass : 'mobile-menu-toggle-inner active'})
            this.setState({mobileMenuClass : 'sidebar-nav mobile-menu active'})
        } else {
            this.setState({toggleClass : 'mobile-menu-toggle-inner'})
            this.setState({mobileMenuClass : 'sidebar-nav mobile-menu'});
        }
    }
    action(item, current) {
        if(item.url !== current) {
            this.setState({activeClass : 'outer-container active'});
            const timer = setTimeout(() => {
                this.setState({activeClass : 'outer-container not-active'});
            }, 2000);
        }
    }
    render() {
        const socialMenu = this.state.socialLinks.map((item, key) => {
           return <li key={key}><a rel="noopener noreferrer" target="_blank" href={item.link}><FontAwesomeIcon icon={['fab', item.type]} /></a></li> 
        });
        const pages = this.state.slugs.map((item, key) => {
            return <Route key={key} path={'/' + item.slug}><Page site={siteUrl} title={item.title.rendered} id={item.id} slug={item.slug} /></Route>
        });
        const menu = this.state.links.map((item, key) => {
            let iconClass = '';
            if(item.class == 'home') {
                iconClass = 'home'
            }
            if(item.class == 'skills') {
                iconClass = 'cog'
            }
            if(item.class == 'about') {
                iconClass = 'user'
            }
            if(item.class == 'contact') {
                iconClass = 'envelope'
            }
           return ( <li key={key}>
                        <DelayLink delay={500} to={{pathname: item.url}} clickAction={() => this.action(item, window.location.pathname)} replace={false}>
                            <div className="sidebar-nav-link">
                                <FontAwesomeIcon icon={iconClass} />
                                <span>{item.title}</span>
                            </div>
                        </DelayLink>
                    </li> )
        });
        return (
            <div className="App">
                <div className={this.state.activeClass}>
                    <Router>
                        <div>
                            <div className="sidebar">
                                <div className="sidebar-logo"><a href="/">
                                    <img className="logo" src={logo} alt="logo" />
                                    <span>TONK</span>
                                </a></div>
                                <ul className="sidebar-nav">
                                    {menu}
                                </ul>
                                <ul className="sidebar-social">
                                    {socialMenu}
                                </ul>
                                <div className="mobile-menu-toggle">
                                    <div className={this.state.toggleClass} onClick={this.toggleMenu}>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            <ul className={this.state.mobileMenuClass}>
                                    {menu}
                                </ul>
                            <ul className="sidebar-social mobile">
                                {socialMenu}
                            </ul>
                            <Switch>
                                {pages}
                                <Route path="/">
                                    <Home site={siteUrl} />
                                </Route>
                            </Switch>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;
