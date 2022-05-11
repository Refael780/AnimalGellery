import { combineReducers, Reducer } from 'redux';
import { fork, all } from 'redux-saga/effects';
import baseReducers, { BaseApplicationState } from '@base/features/base-reducers';

/* ------------- Import States ------------- */
import { CatalogState } from 'actions/catalog/interface';
/* ------------- Import Sagas ------------- */
import { catalogSaga } from 'actions/catalog';

/* ------------- Define ApplicationState ------------- */
export interface ApplicationState extends BaseApplicationState {
	catalog: CatalogState;
}

/* ------------- Export Reducers ------------- */
export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
	...baseReducers,

	catalog: require('./catalog').reducer,
});

/* ------------- Export Sagas ------------- */
export const rootSaga = function*() {
	yield all([fork(catalogSaga)]);
};
