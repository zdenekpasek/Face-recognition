import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt className="Tilt br2 shadow-4" options={{ max: 50 }} style={{ height: 120, width: 150 }}>
				<div className="Tilt-inner tc light-gray f3 pa3 dim"> Face Recognition App </div>
			</Tilt>
		</div>
	);
};

export default Logo;
