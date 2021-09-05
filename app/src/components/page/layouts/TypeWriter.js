import React from 'react'
class TypeWriter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            wholeTile: [],
        };
	}
	componentDidMount = () => {
		let titles = this.props.titles.reverse()
		let timelapse = 0;
		let y = 0
		if(titles.length > 0) {
			for (var i = titles.length - 1; i >= 0; i--) {
				timelapse = timelapse + 500
				y++
				let obj  = {};
				let varName = 'title' + y
				let nth = y
				let dataTitle = [titles[i].title]
				obj[varName] = ''
  				this.setState(obj)
					const timer2 = setTimeout(() => {
						this.StartTextAnimation(0, dataTitle, varName, nth)
					}, this.props.delay);
			}
		}
	}
	renderTitle = (string, varName, n) => {
		let wTitle = this.state.wholeTile
		wTitle[n - 1] = [string]

  		this.setState({
			wholeTile : wTitle
		})
  		return this.title;
  	}
  	typeWriter = (n, varName, text, i, fnCallback) => {
	    // chekc if text isn't finished yet
	    if (i < (text.length)) {
	    	// add next character to h1
			this.renderTitle(text.substring(0, i+1), varName, n);
			// wait for a while and call this function again for next character
			const timer = setTimeout(() => {
				this.typeWriter(n, varName, text, i + 1, fnCallback)
			}, this.props.speed);
	    }
	    // text finished, call callback if there is a callback function
	    else if (typeof fnCallback == 'function') {
			// call callback after timeout
			setTimeout(fnCallback, 700);
	    }
  	}
  	StartTextAnimation = (i, dataText, varName, n) => {
		if(i == 0) {
			if(dataText[i]) {
				if (i < dataText[i].length) {
					// text exists! start typewriter animation
					this.typeWriter(n, varName, dataText[i], 0, () => {
					    this.StartTextAnimation(i + 1, dataText, varName, n);
					});
				}
			}
		}
  	}
	render() {
		const renderedTitles = this.state.wholeTile.map((item, key) => {
           return <span key={key}>{item}</span> 
        })
		return renderedTitles
		}
	}

export default TypeWriter;