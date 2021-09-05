import React from 'react';
import Axios from "axios";

class Form extends React.Component {
	constructor(props) {
		super(props)
		this.state = {	
			formSent: '',
			fields : [],
			thankYouMessage : '',
			formSentThankYou : 'thankyou-message'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount = () => {
		if(!this.props.fields && !this.props.message) {
			Axios.get(this.props.site + '/wp-json/tonk/v2/form-fields')
	            .then(res => {
	            	this.setState({
						fields : res.data.fields,
						thankYouMessage : res.data.thank_you_message
					})
	            })
		} else {
			this.setState({
				fields : this.props.fields,
				thankYouMessage : this.props.message
			})
		}
	}
	emailIsValid (email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	}
	handleSubmit(event) {
		let error = 0;
  		var formData  = {};

  		let newFields = this.state.fields

  		for (var i = newFields.length - 1; i >= 0; i--) {
  			var field = newFields[i]
  			if(field.value === '') {
  				error++
  				field.error = true
  				field.errorClass = 'error-box error'
  			} else if(field.type === 'email') {
  				if(!this.emailIsValid(field.value)) {
	  				field.errorClass = 'error-box error'
	  				error++
	  			} 
  			} else {
  				field.error = false
  				field.errorClass = 'error-box'
  			}
  		}
  		formData = newFields
  		this.setState(
	  		{
	  			fields : newFields
	  		}
  		)
  		if(error === 0) {
  			Axios.post(this.props.site + '/wp-json/tonk/v2/form', { formData })
      			.then(res => {
        			if(res.status == 200) {
        				this.setState({
        					formSent: 'form-sent',
        					formSentThankYou: 'thankyou-message isActive'
        				})
        				window.ga( 'send', 'event', 'Contact Form Sent', 'submit' )
        			}
      			})
  		}
  		event.preventDefault()
	}
	setActive = (key) => {
		let newFields = this.state.fields
  		newFields[key].active = 'active'

  		this.setState(
	  		{
	  			fields : newFields
	  		}
  		)
	}
	handleChange = (e, key) => {
		let newFields = this.state.fields
  		newFields[key].value = e.target.value
  		newFields[key].active = 'active'
  		this.setState(
	  		{
	  			fields : newFields
	  		}
  		)
  	}
  	onChange(e) {
	    console.log(e.target);
	}
	render() {
		console.log(this.state.fields)
		let fields = this.state.fields.map((item, key) => {
			let errorMessage
			if(item.error) {
				errorMessage = <div className="error-message">{item.errorMessage}</div>
			}
			if(item.type == 'textarea') {
				let i = key
				return <div key={key} className="form-row form-textarea">
							<div className={item.errorClass}>
								<div className={item.active}>
									<div onClick={() => this.setActive(i)} className="form-placeholder">{item.title}</div>
									<textarea 
										value={item.value} 
										onChange = {(e) => this.handleChange(e, i)} 
										onFocus={() => this.setActive(i)} 
										name={item.title}>
									</textarea>
								</div>
							</div>
							{errorMessage}
						</div>
			} else if(item.type == 'text' || item.type == 'email') {
				let i = key
				return <div key={key} className="form-row">
							<div className={item.errorClass}>
								<div className={item.active}>
									<div onClick={() => this.setActive(i)} className="form-placeholder">{item.title}</div>
									<input 
										type={item.type}
										value={item.value} 
										onChange={(e) => this.handleChange(e, i)} 
										onFocus={() => this.setActive(i)} 
										name={item.title}/>
								</div>
							</div>
							{errorMessage}
						</div>
			} else if(item.type == 'checkbox') {
				let i = key
				let placeholder = item.title
				if(item.title == 'Privacy Policy') {
					placeholder = 'I have read and agree to the <a target="_blank" href="/privacy-policy">Privacy Policy</a>'
				}
				return <div key={key} className="form-row-checkbox">
								<label class="checkbox-container">
									<span dangerouslySetInnerHTML={{__html: placeholder}}></span>
									<input name={item.title} checked={item.isChecked} value={item.value} type="checkbox" onChange={this.onChange} />
									<span class="checkmark"></span>
								</label>
							{errorMessage}
						</div>
			}
        });
		return <div>
					<div className={this.state.formSentThankYou}>
						{this.state.thankYouMessage}
					</div>
					<form className={this.state.formSent} onSubmit={this.handleSubmit}>
						{fields}
						<div className="form-row">
							<button className="btn" type="submit">Send</button>
						</div>
					</form>
				</div>
		}
	}

export default Form;

