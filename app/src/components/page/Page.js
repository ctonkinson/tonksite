import React from 'react';
import Axios from "axios";
import Loading from '../loading/Loading.js';
//import Form from '../form/Form.js';
import TitleContent from './layouts/TitleContent.js';
import Form from './layouts/Form.js';
import Map from './layouts/Map/MapContainer.js';
import RotatingText from './layouts/RotatingText.js';
import CodeAnimation from './layouts/CodeAnimation.js';
import ReactGA from 'react-ga'
class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            title: '',
            content: '',
            layouts: []
        }
        ReactGA.pageview(window.location.pathname + window.location.search)
	}
	componentDidMount = () => {
		this.getContent();
		document.title = 'Tonk | Web Developer | ' + this.props.title
	}
	getContent (){
        let self = this;
        Axios.get(this.props.site + '/wp-json/tonk/v2/page/' +  this.props.id)
            .then(res => {
            	var data = res.data.reverse()
            	var layoutArray  = []
            	for (var i = data.length - 1; i >= 0; i--) {
            		
            		if(data[i].type === 'title_and_content_block') {
            			layoutArray.push(<TitleContent site={this.props.site} titles={data[i].title} content={data[i].content} />)
            		}
            		if(data[i].type === 'form') {
            			layoutArray.push(<Form site={this.props.site} fields={data[i].fields} message={data[i].thank_you_message} />)
            		}
            		if(data[i].type === 'map') {
            			layoutArray.push(<Map lat={data[i].lat} long={data[i].long} />)
            		}
            		if(data[i].type === 'rotating_text') {
            			layoutArray.push(<RotatingText type={data[i].type} rotating_text={data[i].rotating_text} />)
            		}
            		if(data[i].type === 'code_animation') {
            			layoutArray.push(<CodeAnimation type={data[i].type} />)
            		}
            	}
            	this.setState({
		  			layouts : layoutArray
		  		})
            })
    }
	render() {
		let layouts
		layouts = this.state.layouts.map((item, key) => {
            return <div className="page-column" key={key}>
            			{item}
            		</div>
        });
       
		return <div>
					<Loading />
					<div className="page-container" id={this.props.slug}>
						{layouts}
					</div>
				</div>
		}
	}

export default Page;