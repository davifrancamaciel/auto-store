import React, { useEffect } from 'react';
import useQuery from '../../hooks/queryString';

const Splash = ({ children }) => {
	const query = useQuery();

	useEffect(() => {
		if (query.get('r')) {
			window.location.href = `${window.location.origin}${window.location.pathname}`;
		}
	}, []);

	if (query.get('r')) return <div />;
	else return <div>{children}</div>;
};

export default Splash;
