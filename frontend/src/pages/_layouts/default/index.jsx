import React from 'react';

import Header from '../../../components/Header';
import Splash from '../../../components/Splash';

import { Wrapper } from './styles';

const DefaultLayout = ({ children }) => {
	return (
		<Splash>
			<Wrapper className="as-layout-default">
				<Header />
				{children}
			</Wrapper>
		</Splash>
	);
};

export default DefaultLayout;
