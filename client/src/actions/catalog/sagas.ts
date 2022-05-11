import axios, { AxiosResponse } from 'axios';
import { call, put, take, select } from 'redux-saga/effects';
import { CatalogActions } from 'actions/catalog';
import { Animal, RemoveAnimalRequestAction, EditAnimalRequestAction } from 'actions/catalog/interface';
import { config } from 'config';
import { catalogSelector, CatalogTypes } from './redux';

export function* getAnimalList() {
	// replace api with api.getDevices to point to server
	console.log('hi there');

	const response: AxiosResponse<Array<Animal>> = yield call(() => getAllAnimalsApi());

	if (response.status === 200) {
		yield put(CatalogActions.getAnimalListSuccess(response.data));
	}
}
export function* createAnimal() {
	// replace api with api.getDevices to point to server
	const animalForm = yield select(catalogSelector.createAnimal);
	const animal: any = {
		name: animalForm.values.name,
		imgUrl: animalForm.values.imgUrl || '',
		description: animalForm.values.description || '',
		lifeTime: animalForm.values.lifeTime || '',
	};
	const response: AxiosResponse<Array<Animal>> = yield call(() => createAnimalsApi(animal));

	if (response.status === 200) {
		yield put(CatalogActions.createAnimalSuccess());
	}
}
export function* editAnimal(action: EditAnimalRequestAction) {
	// replace api with api.getDevices to point to server
	console.log(action);

	const { animalId } = action;
	const animalForm = yield select(catalogSelector.createAnimal);
	const animal: any = {
		name: animalForm.values.name,
		imgUrl: animalForm.values.imgUrl || '',
		description: animalForm.values.description || '',
		lifeTime: animalForm.values.lifeTime || '',
	};
	const response: any = yield call(() => updateAnimalApi(animalId, animal));
	console.log(response);

	if (response.status === 200) {
		yield put(CatalogActions.editAnimalSuccess());
		yield take(CatalogTypes.GET_ANIMAL_LIST_SUCCESS)
		yield put (CatalogActions.getAnimalListRequest())
	}
}

export function* removeAnimalProcessStart() {
	const choosenAnimalId = yield select(catalogSelector.chooseAnimalId);
	console.log(choosenAnimalId);

	if (choosenAnimalId && choosenAnimalId.animalId !== '') {
		yield put(CatalogActions.removeAnimalRequest(choosenAnimalId));
		yield take(CatalogTypes.REMOVE_ANIMAL_SUCCESS);
		yield put(CatalogActions.hideRemoveModal());
	}		yield put(CatalogActions.getAnimalListRequest());

	yield put(CatalogActions.removeAnimalProcessEnd());
}

export function* removeAnimal(action: RemoveAnimalRequestAction) {
	// replace api with api.getDevices to point to server
	const { animalId } = action;

	const response: AxiosResponse<Array<Animal>> = yield call(() => removeAnimalApi(animalId));

	if (response.status === 200) {
		yield put(CatalogActions.removeAnimalSuccess());
	}
}

const createAnimalsApi = async (animalToAdd: any) => {
	try {
		const configHe: any = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const newAnimal = {
			animal: {
				...animalToAdd,
			},
		};

		const res = await axios.post(`${config.ROOT_SERVER_URL}api/animal`, newAnimal, configHe);
		console.log(res);

		return res;
	} catch (error) {
		console.log(error);
		return [];
	}
};
const getAllAnimalsApi = async () => {
	try {
		const configHe: any = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.get( `${config.ROOT_SERVER_URL}api/animal`||'http://localhost:5000/api/animal', configHe);
		console.log(res);

		return res;
	} catch (error) {
		console.log(error);
		return [];
	}
};
const removeAnimalApi = async (animalId: any) => {
	try {
		const configHe: any = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.delete(`${config.ROOT_SERVER_URL}api/animal/${animalId}`, configHe);
		console.log(res);

		return res;
	} catch (error) {
		console.log(error);
		return [];
	}
};
const updateAnimalApi = async (animalId: string, animalToAdd: any) => {
	try {
		const configHe: any = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const newAnimal = {
			animal: {
				...animalToAdd,
			},
		};

		const res = await axios.put(`${config.ROOT_SERVER_URL}api/animal/${animalId}`, newAnimal, configHe);
		console.log(res);

		return res;
	} catch (error) {
		console.log(error);
		return [];
	}
};
