import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import { ToastProvider } from 'react-toast-notifications';
import { MediaContextProvider } from 'base/features/base-render-mobile';

/* -------- Harmony Features Bootstrap --------- */
import { Store, history } from 'base/features';

export default (Story: any) => {
	return (
		<Provider store={Store}>
			<LocalizeProvider store={Store}>
				<MediaContextProvider>
					<ToastProvider>
						<Router history={history}>
							{Story()}
						</Router>
					</ToastProvider>
				</MediaContextProvider>
			</LocalizeProvider>
		</Provider>
	);
};
