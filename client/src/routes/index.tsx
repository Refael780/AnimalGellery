import * as React from 'react';
import { Switch } from 'react-router-dom';
import Route from './PageContainer';

/* -------------- Pages --------------- */
import App from '../App';

/* -------------- Routes Paths --------------- */
import RoutesPath from './RoutesPath';
import AnimalGallery from 'pages/AnimalGallery';
import CreateAnimal from 'pages/CreateAnimal';

export default (
	<App>
		<Switch>
			<Route
				exact
				path={RoutesPath.CREATE_ANIMAL}
				component={() => <CreateAnimal form="createAnimal" formName="createAnimal" />}
			/>
			<Route path={RoutesPath.ROOT} component={AnimalGallery} />
		</Switch>
	</App>
);
