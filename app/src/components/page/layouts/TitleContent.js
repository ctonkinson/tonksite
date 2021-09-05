import React from 'react'
import Form from './Form.js'
import TypeWriter from './TypeWriter.js'
class TitleContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            content: '',
            hasForm: false
        };
	}
	checkIfForm(html) {
	    var template = document.createElement('template');
	    template.innerHTML = html;
	    var childNodes = template.content.childNodes;
	    for (var i = childNodes.length - 1; i >= 0; i--) {
	    	if(childNodes[i].id === 'form') {
	    		return true
	    	} 
	    }
	}
	componentDidMount = () => {
		let titles = this.props.titles.reverse()
		let timelapse = 0;
		let y = 0
		this.setState({
			content : this.props.content
		})
		
		//Check for form reference 
		var formPresent = this.checkIfForm(this.props.content)
  		this.setState({
			hasForm : formPresent
		})
	}
	render() {
		let form
		let mainTitle
       	if(this.state.hasForm) {
       		form = <Form site={this.props.site} />
       	}
       	if(this.props.titles.length > 0) {
       		mainTitle = <h1><TypeWriter delay={1000} speed={50} titles={this.props.titles} /></h1> 
       	}
		return <div>
					{mainTitle}
					<div className="content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
					{form}
				</div>
		}
	}

export default TitleContent;