import React, {  useState, useEffect } from 'react';
import './layout-styles/RotatingText.scss';
import { AnimateOnChange, HideUntilLoaded } from 'react-animation'

const Output = (props) => {
	const words = props.rotating_text
	const type = props.type
	const [current, setCurrent] = useState(0)

	let wordBg = []
	for (var i = 20; i >= 0; i--) {
		wordBg.push(words)
	}

	useEffect(() => {
		const interval = setInterval(() => {
			if (current === words.length - 1) {
				setCurrent(0)
			} else {
				setCurrent(current + 1)
			}
		}, 1000);
		return (() => {
			clearInterval(interval)
		})
	})
  
  return (<div className={type}>
  			<div className="word-background">
				{wordBg.toString().replace(/,/g, ' ')} 
			</div> 	
      		<h1><AnimateOnChange animationOut="bounceOut" animationIn="bounceIn" durationOut="500">{words[current]}</AnimateOnChange></h1>
    	</div>
  )
}
export default Output;