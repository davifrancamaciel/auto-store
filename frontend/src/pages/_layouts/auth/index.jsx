import React from 'react';
import Splash from '../../../components/Splash'
import { Wrapper, Content } from './styles';

const AuthLayout = ({ children }) => {
	return (
		<Splash>
			<Wrapper>
				<Content>{children}</Content>
			</Wrapper>
		</Splash>
	);
};

export default AuthLayout;
