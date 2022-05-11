import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { CustomRoute } from '@base/features/base-decorator';
import { Container } from '@mui/material';

const routeDecorator = (WrappedComponent: any, step?: string) => {
	class PageContainer extends React.Component<any> {
		componentDidMount() {

		}

		render() {
			return (
				<Container>
					{/* eslint-disable-next-line react/jsx-props-no-spreading */}
					<WrappedComponent {...this.props} />
				</Container>
			);
		}
	}

	return baseConnect(
		PageContainer,
		(/* state: any */) => ({}),
		{}
	);
};

export default CustomRoute(routeDecorator);
