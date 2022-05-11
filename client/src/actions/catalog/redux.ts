import { createDraft, Draft } from 'immer';
import { createReducerCase } from '@base/features/base-decorator';
import { createReducer, createActions } from 'reduxsauce';
import { ApplicationState } from 'actions';
import {
	TypesNames,
	ActionCreator,
	CatalogState,
	ShowRemoveModalAction,
	GetAnimalListSuccessAction,
	SetPageStateAction,
} from './interface';

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions<TypesNames, ActionCreator>({
	getDeviceList: [],

	showRemoveModal: ['animalId'],
	hideRemoveModal: [],

	getAnimalListRequest: [],
	getAnimalListSuccess: ['animalList'],

	removeAnimalProcessStart: [],
	removeAnimalProcessEnd: [],

	removeAnimalRequest: ['animalId'],
	removeAnimalSuccess: [],

	createAnimalRequest: [],
	createAnimalSuccess: [],

	editAnimalRequest: ['animalId'],
	editAnimalSuccess: [],

	setPageState: ['pageState', 'animal'],
});

export const CatalogTypes = TypesNames;
export const CatalogActions = Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = createDraft<CatalogState>({
	deviceList: [],
	modalAnimalId: '',
	isPresentModal: false,
	chooseAnimalId: '',
	animalList: [],
	isJustConfirm: false,
	pageState: 'Gallery',
	selectedAnimal: undefined,
});

/* ------------- Selectors ------------- */

export const catalogSelector = {
	devices: (state: ApplicationState) => state.catalog.deviceList,
	animals: (state: ApplicationState) => state.catalog.animalList,
	modalState: (state: ApplicationState) => state.catalog.isPresentModal,
	chooseAnimalId: (state: ApplicationState) => state.catalog.chooseAnimalId,
	createAnimal: (state: ApplicationState) => state.form.createAnimal,
	isJustConfirm: (state: ApplicationState) => state.catalog.isJustConfirm,
	pageState: (state: ApplicationState) => state.catalog.pageState,
	selectedAnimal: (state: ApplicationState) => state.catalog.selectedAnimal,
};
/* ------------- Reducers ------------- */

const setAnimalListReducer = (draft: Draft<CatalogState>, action: GetAnimalListSuccessAction) => {
	const { animalList } = action;
	draft.animalList = animalList;
	draft.isJustConfirm = false;
	draft.pageState = 'Gallery';
};
const setShowModaltReducer = (draft: Draft<CatalogState>, action: ShowRemoveModalAction) => {
	const { animalId } = action;

	draft.isPresentModal = true;
	draft.chooseAnimalId = animalId;
};
const setHideModaltReducer = (draft: Draft<CatalogState>) => {
	draft.isPresentModal = false;
	draft.chooseAnimalId = '';
};
const setCreateAnimalReducer = (draft: Draft<CatalogState>) => {
	draft.isJustConfirm = true;
};
const setEditAnimalReducer = (draft: Draft<CatalogState>) => {
	draft.isJustConfirm = true;
};
const setPageStateReducer = (draft: Draft<CatalogState>, action: SetPageStateAction) => {
	const { pageState, animal } = action;
	draft.pageState = pageState;
	if (animal) {
		draft.selectedAnimal = animal;
	}
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[CatalogTypes.SHOW_REMOVE_MODAL]: createReducerCase(setShowModaltReducer),
	[CatalogTypes.HIDE_REMOVE_MODAL]: createReducerCase(setHideModaltReducer),
	[CatalogTypes.GET_ANIMAL_LIST_SUCCESS]: createReducerCase(setAnimalListReducer),
	[CatalogTypes.CREATE_ANIMAL_SUCCESS]: createReducerCase(setCreateAnimalReducer),
	[CatalogTypes.EDIT_ANIMAL_SUCCESS]: createReducerCase(setEditAnimalReducer),
	[CatalogTypes.SET_PAGE_STATE]: createReducerCase(setPageStateReducer),
});
