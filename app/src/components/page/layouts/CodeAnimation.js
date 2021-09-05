import React from 'react';
import './layout-styles/CodeAnimation.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TypeWriter from './TypeWriter.js';
class CodeAnimation extends React.Component {

	render() {
		console.log('About Me!')
		const codeTitle = [{title:'console'}]
		const codeTitle2 = [{title:'.'}]
		const codeTitle3 = [{title:'log'}]
		const codeTitle4 = [{title:'('}]
		const codeTitle5 = [{title: "'About Me!'"}]
		const codeTitle6 = [{title: ')'}]
		const chev = <svg id="chevron-down" xmlns="http://www.w3.org/2000/svg" width="15" height="9.103" viewBox="0 0 15 9.103"> <path id="chevron-down-2" data-name="chevron-down" d="M12.573,132.356,5.9,125.68a.824.824,0,0,1,0-1.166l.779-.779a.824.824,0,0,1,1.164,0l5.315,5.291,5.315-5.291a.824.824,0,0,1,1.164,0l.779.779a.824.824,0,0,1,0,1.166l-6.676,6.676a.824.824,0,0,1-1.166,0Z" transform="translate(-5.656 -123.494)" fill="#fff"></path> </svg>
		return <div className={this.props.type}>
					<div className="code-bg">
						<div className="code-editor" id="ce-one">
							<div className="code-editor-header">
								<FontAwesomeIcon icon='cog' />
								<span>HTML</span>
								{chev}
							</div>
							<div className="code-editor-main">
								<code>
									<span className="code-1">&lt;div</span> 
									<span className="code-2"> id</span>
									<span className="code-3">=</span>
									<span className="code-4">"ctonkinson"</span>
									<span className="code-1">&gt;&lt;/div&gt;</span>
								</code>
							</div>
						</div>
						<div className="code-editor" id="ce-two">
							<div className="code-editor-header">
								<FontAwesomeIcon icon='cog' />
								<span>SCSS</span>
								{chev}
							</div>
							<div className="code-editor-main">
								<code>
									<div><span className="code-2">#ctonkinson</span> &#x7b;</div>
									<div className="indent-1"><span className="code-1">height</span>: <span className="code-4">6538px</span>; </div>
									<div className="indent-1"><span className="code-2">head</span> &#x7b;</div>
									<div className="indent-2"><span className="code-2">.hair</span> &#x7b; <span className="code-1">color</span>: <span className="code-4">#e0b38a</span>; &#125;</div>
									<div className="indent-2"><span className="code-2">.eyes</span> &#x7b; <span className="code-1">color</span>:  <span className="code-4">blue</span>;  &#125;</div>
									<div className="indent-1">&#125;</div>
									<div>&#125;</div>
								</code>
							</div>
						</div>
						<div className="code-editor" id="ce-three">
							<div className="code-editor-header">
								<FontAwesomeIcon icon='cog' />
								<span>JS</span>
								{chev}
							</div>
							<div className="code-editor-main">
								<code>
									<div>
										<span className="code-1">
											<TypeWriter speed={100} delay={5000} titles={codeTitle} />
										</span>
										<span className="code-2">
											<TypeWriter speed={100} delay={5700} titles={codeTitle2} />
										</span>
										<span className="code-1">
											<TypeWriter speed={100} delay={5800} titles={codeTitle3} />
										</span>
											<TypeWriter speed={100} delay={7000} titles={codeTitle4} />
										<span className="code-4">
											<TypeWriter speed={100} delay={7100} titles={codeTitle5} />
										</span><TypeWriter speed={100} delay={8200} titles={codeTitle6} />
										<div className="flashing-cursor"></div></div>
								</code>
							</div>
						</div>
					</div>
				</div>
		}
	}

export default CodeAnimation;