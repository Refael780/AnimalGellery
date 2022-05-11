/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { TranslateFunction } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';
import './style.scss';
import RoutesPath from 'routes/RoutesPath';

export type Props = {};

export interface OwnProps extends Props {
	translate: TranslateFunction;
}

interface HeaderState {
	cartToggle: boolean;
}

export class Header extends React.Component<OwnProps, HeaderState> {
	constructor(props: OwnProps) {
		super(props);
		this.state = {
			cartToggle: false,
		};
	}
	setCartToggle() {
		const { cartToggle } = this.state;
		this.setState({
			cartToggle: !cartToggle,
		});
	}

	render() {
		return (
			<>
				<nav>
					<div className="container">
						<ul className="navbar-left">
							<li>
								<Link to={RoutesPath.ROOT}>Home</Link>
							</li>
						</ul>
					</div>
				</nav>
			</>
		);
	}
}

export default baseConnect<any, any, Props>(
	Header,
	() => ({}),
	() => ({})
);
