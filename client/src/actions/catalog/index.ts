import { all, fork, takeLatest } from 'redux-saga/effects';
import { createSaga } from '@base/features/base-decorator';
import * as Sagas from 'actions/catalog/sagas';
import { CatalogTypes } from 'actions/catalog';

/* ------------- Export Redux ------------- */
export * from 'actions/catalog/redux';

/* ------------- Export Sagas ------------- */
function* watchGetAnimalsList() {
	yield takeLatest(CatalogTypes.GET_ANIMAL_LIST_REQUEST, createSaga(Sagas.getAnimalList));
}
function* watchRemoveAnimalsProcessStart() {
	yield takeLatest(CatalogTypes.REMOVE_ANIMAL_PROCESS_START, createSaga(Sagas.removeAnimalProcessStart));
}
function* watchRemoveAnimalsRequest() {
	yield takeLatest(CatalogTypes.REMOVE_ANIMAL_REQUEST, createSaga(Sagas.removeAnimal));
}
function* watchCreateAnimalsRequest() {
	yield takeLatest(CatalogTypes.CREATE_ANIMAL_REQUEST, createSaga(Sagas.createAnimal));
}

function* watchEditAnimalsRequest() {
	yield takeLatest(CatalogTypes.EDIT_ANIMAL_REQUEST, createSaga(Sagas.editAnimal));
}

export function* catalogSaga() {
	yield all([
		fork(watchGetAnimalsList),
		fork(watchRemoveAnimalsProcessStart),
		fork(watchRemoveAnimalsRequest),
		fork(watchCreateAnimalsRequest),
		fork(watchEditAnimalsRequest),
	]);
}
