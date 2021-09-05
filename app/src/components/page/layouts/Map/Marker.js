import React from 'react';
import './Marker.css';
import marker from '../../../../assets/images/marker.png';
class Marker extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
            color: props.color,
            name: props.name
        };
	}
	render() {
		return <div>
        <div
          className="pin bounce"
          style={{ backgroundImage: 'url(' + marker + ')', cursor: 'pointer' }}
          title={this.state.name}
        />
        <div className="pulse" />
      </div>
		}
	}

export default Marker;