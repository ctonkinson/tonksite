import React from 'react';
import './Home.scss';
import earth from '../../assets/images/earth.svg';
import places from '../../assets/images/places.svg';
import balloon from '../../assets/images/balloon.svg';
import cloud1 from '../../assets/images/cloud-1.svg';
import cloud2 from '../../assets/images/cloud-2.svg';
import cloud3 from '../../assets/images/cloud-3.svg';
import hele from '../../assets/images/hele.svg';
import wings from '../../assets/images/props.svg';
import Axios from "axios";
import Loading from '../loading/Loading.js';
import ReactGA from 'react-ga'
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            title: '',
            title2: '',
            title3: '',
            placesClass: 'places',
            heleClass: 'hele-container',
            content: ''
        }
        ReactGA.pageview(window.location.pathname + window.location.search)
	}
	componentDidMount = () => {
		this.getContent();
		document.title = 'Tonk | Web Developer | Home'
	}
	getContent (){
        let self = this;
        Axios.get(this.props.site + '/wp-json/tonk/v2/home')
            .then(res => {
            	this.dataText = [res.data.title1];
            	this.dataText2 = [res.data.title2];
            	this.dataText3 = [res.data.title3];
            	this.setState({content : res.data.content});
                this.StartTextAnimation(0, this.dataText, 'title');
				const timer = setTimeout(() => {
					this.StartTextAnimation(0, this.dataText2, 'title2');
				}, 500);
				const timer2 = setTimeout(() => {
					this.StartTextAnimation(0, this.dataText3, 'title3');
				}, 1800);
				const timer3 = setTimeout(() => {
					this.setState({placesClass : 'places active'});
					this.setState({heleClass : 'hele-container active'});
				}, 1000);
            })
    }
	goToLink = (link) => {
		this.props.action(link);
  	}
  	renderTitle = (string, varName) => {
  		var obj  = {};
  		if(!string) {
  			obj[varName] = '';
  			this.setState(obj);
  		} else {
  			obj[varName] = string;
  			this.setState(obj);
  		}
  		return this.title;
  	}
  	typeWriter = (varName, text, i, fnCallback) => {
	    // chekc if text isn't finished yet
	    if (i < (text.length)) {
	    	// add next character to h1
			this.renderTitle(text.substring(0, i+1), varName);
			// wait for a while and call this function again for next character
			const timer = setTimeout(() => {
				this.typeWriter(varName, text, i + 1, fnCallback)
			}, 50);
	    }
	    // text finished, call callback if there is a callback function
	    else if (typeof fnCallback == 'function') {
			// call callback after timeout
			setTimeout(fnCallback, 700);
	    }
  	}
  	StartTextAnimation = (i, dataText, varName) => {
		if(i == 0) {
			if (i < dataText[i].length) {
				// text exists! start typewriter animation
				this.typeWriter(varName, dataText[i], 0, () => {
				    this.StartTextAnimation(i + 1, dataText, varName);
				});
			}
		}
  	}
	render() {
		let placesClass = 'places';
		let loading
		if(localStorage.getItem('history') == 'set') {
			loading = <Loading />
		}
		return <div>
					{loading}
					<div className="page-container">
						<div className="ct-row">
							<div className="ct-col-6 ">
								<div className="text-content">
									<h1>
										<div>{this.state.title}</div>
										<div>{this.state.title2}</div>
										<div>{this.state.title3}</div>
									</h1>
									<div className="content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
									
								</div>
							</div>
							<div className="ct-col-6 image-animation">
								<div className="earth-container">
									<div className={this.state.heleClass}>
										<div className="hele-inner-container">
											<img className="hele" src={hele} alt="hele" />
											<img className="wings" src={wings} alt="props" />
										</div>
									</div>
									<div className="balloon-container">
										<div className="balloon-inner-container">
											<img className="cloud-1" src={cloud1} alt="cloud" />
											<img className="cloud-2" src={cloud2} alt="cloud" />
											<img className="cloud-3" src={cloud3} alt="cloud" />
											<img className="balloon" src={balloon} alt="balloon" />
										</div>
									</div>
									<img className="earth" src={earth} alt="earth" />
									<img className={this.state.placesClass} src={places} alt="places" />
								</div>
							</div>
						</div>
					</div>
				</div>
		}
	}

export default Home;

