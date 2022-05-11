import { MOCK_TYPES } from './requests/mock-service-worker/interface';

interface Config {
	ROOT_SERVER_URL?: string;
	ROOT_WS_URL?: string;
	USE_WS_ACTION?: boolean;
	COMMON_AUTHORIZATION_HEADER?: string;
	appName?: string;
	STRICT_CONSOLE_ERROR?: boolean;
	USE_MOCK?: boolean;
	MOCK_TYPE?: MOCK_TYPES;
}

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION__: Function;
	}
}

const initConfig = (): Config => {
	let appConfig: Config = {};

	if (process.env.NODE_ENV === 'development') {
		/* ---------- Config Development --------- */
		appConfig = {
			USE_WS_ACTION: false,
			ROOT_SERVER_URL: 'https://animal-gallery-elbit.herokuapp.com/',
			COMMON_AUTHORIZATION_HEADER: 'uxfauthorization',
			ROOT_WS_URL: 'ws://localhost:3030',
			STRICT_CONSOLE_ERROR: false,
			USE_MOCK: false,
			MOCK_TYPE: MOCK_TYPES.WHITE_LIST,
		};
	} else if (process.env.NODE_ENV === 'production') {
		/* ---------- Config Production --------- */
		appConfig = {
			USE_WS_ACTION: false,
			ROOT_SERVER_URL: 'https://animal-gallery-elbit.herokuapp.com/',
			COMMON_AUTHORIZATION_HEADER: 'uxfauthorization',
			ROOT_WS_URL: 'ws://localhost:3030',
			STRICT_CONSOLE_ERROR: false,
		};
	}

	return appConfig;
};

export const config = initConfig();
