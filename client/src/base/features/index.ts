/* -------- Harmony Features Bootstrap --------- */
import Store from '@base/features/base-store';
import '@base/features/base-redux-websocket-actions';
import '@base/features/base-translations';
import '@base/features/base-global-spinner';
import history from '@base/features/base-history';

/* ----------Load Mock Service Worker -------*/
import 'base/features/base-mock-service-worker';

export { Store, history };
