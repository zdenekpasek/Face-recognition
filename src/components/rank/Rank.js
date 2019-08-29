import React from 'react';

const Rank = ({ name, entries }) => {
	return (
		<div className="tc light-gray dim">
			<div className="white f3">{`${name}, your current count is...`}</div>
			<div className="white f1 ">{entries}</div>
		</div>
	);
};

export default Rank;
