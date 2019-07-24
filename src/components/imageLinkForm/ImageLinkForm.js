import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = () => {
	return (
		<div>
			<p className="f2 tc light-gray dim">{'Paste url of an image to detect face :)'}</p>
			<div className="center">
				<div className="pa4 br3 shadow-5 form center">
					<input className="fa4 pa2 w-70 center" type="tex" placeholder="url" />
					<button className="w-30 grow f4 link ph3 pv2 dib white pointer bg-light-purple br2 ml2">
						Detect
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImageLinkForm;
