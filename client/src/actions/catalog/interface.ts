import { Action } from 'redux';

/* ------------- Define Actions and State ------------- */
export interface CatalogState {
	deviceList: Device[];
	isPresentModal: boolean;
	modalAnimalId: string;
	animalList: Animal[];
	chooseAnimalId: string;
	isJustConfirm: boolean;
	pageState: PageState;
	selectedAnimal?: Animal;
}

export enum TypesNames {
	GET_DEVICE_LIST = 'GET_DEVICE_LIST',

	GET_ANIMAL_LIST_REQUEST = 'GET_ANIMAL_LIST_REQUEST',
	GET_ANIMAL_LIST_SUCCESS = 'GET_ANIMAL_LIST_SUCCESS',

	SET_DEVICE_LIST = 'SET_DEVICE_LIST',

	SHOW_REMOVE_MODAL = 'SHOW_REMOVE_MODAL',
	HIDE_REMOVE_MODAL = 'HIDE_REMOVE_MODAL',

	SET_PAGE_STATE = 'SET_PAGE_STATE',

	REMOVE_ANIMAL_PROCESS_START = 'REMOVE_ANIMAL_PROCESS_START',
	REMOVE_ANIMAL_PROCESS_END = 'REMOVE_ANIMAL_PROCESS_END',

	REMOVE_ANIMAL_REQUEST = 'REMOVE_ANIMAL_REQUEST',
	REMOVE_ANIMAL_SUCCESS = 'REMOVE_ANIMAL_SUCCESS',

	CREATE_ANIMAL_REQUEST = 'CREATE_ANIMAL_REQUEST',
	CREATE_ANIMAL_SUCCESS = 'CREATE_ANIMAL_SUCCESS',

	EDIT_ANIMAL_REQUEST = 'EDIT_ANIMAL_REQUEST',
	EDIT_ANIMAL_SUCCESS = 'EDIT_ANIMAL_SUCCESS',
}

export declare function GetAnimalListRequestFunction(): GetAnimalListRequestAction;
export declare function GetAnimalListSuccessFunction(animalList: Animal[]): GetAnimalListSuccessAction;

export declare function HideRemoveModalFunction(): HideRemoveModalAction;
export declare function ShowRemoveModalFunction(animalId: string): ShowRemoveModalAction;

export declare function RemoveAnimalRequestFunction(animalId: string): RemoveAnimalRequestAction;
export declare function RemoveAnimalSuccessFunction(): RemoveAnimalSuccessAction;

export declare function RemoveAnimalProcessStartFunction(): RemoveAnimalProcessStartAction;
export declare function RemoveAnimalProcessEndFunction(): RemoveAnimalProcessEndAction;

export declare function CreateAnimalRequestFunction(): CreateAnimalRequestAction;
export declare function CreateAnimalSuccessFunction(): CreateAnimalSuccessAction;

export declare function EditAnimalRequestFunction(animalId: string): EditAnimalRequestAction;
export declare function EditAnimalSuccessFunction(): EditAnimalSuccessAction;

export declare function SetPageStateFunction(pageState: PageState, animal?: Animal): SetPageStateAction;

export interface ActionCreator {
	showRemoveModal: typeof ShowRemoveModalFunction;
	hideRemoveModal: typeof HideRemoveModalFunction;

	getAnimalListRequest: typeof GetAnimalListRequestFunction;
	getAnimalListSuccess: typeof GetAnimalListSuccessFunction;

	removeAnimalProcessStart: typeof RemoveAnimalProcessStartFunction;
	removeAnimalProcessEnd: typeof RemoveAnimalProcessEndFunction;

	removeAnimalRequest: typeof RemoveAnimalRequestFunction;
	removeAnimalSuccess: typeof RemoveAnimalSuccessFunction;

	createAnimalRequest: typeof CreateAnimalRequestFunction;
	createAnimalSuccess: typeof CreateAnimalSuccessFunction;

	editAnimalRequest: typeof EditAnimalRequestFunction;
	editAnimalSuccess: typeof EditAnimalSuccessFunction;

	setPageState: typeof SetPageStateFunction;
}

export interface SetPageStateAction extends Action<TypesNames.SET_PAGE_STATE> {
	pageState: PageState;
	animal?: Animal;
}

export interface ShowRemoveModalAction extends Action<TypesNames.SHOW_REMOVE_MODAL> {
	animalId: string;
}

export type RemoveAnimalProcessStartAction = Action<TypesNames.REMOVE_ANIMAL_PROCESS_START>;
export type RemoveAnimalProcessEndAction = Action<TypesNames.REMOVE_ANIMAL_PROCESS_END>;

export interface RemoveAnimalRequestAction extends Action<TypesNames.REMOVE_ANIMAL_REQUEST> {
	animalId: string;
}
export type RemoveAnimalSuccessAction = Action<TypesNames.REMOVE_ANIMAL_SUCCESS>;

export interface EditAnimalRequestAction extends Action<TypesNames.EDIT_ANIMAL_REQUEST> {
	animalId: string;
}
export type EditAnimalSuccessAction = Action<TypesNames.EDIT_ANIMAL_SUCCESS>;

export type CreateAnimalRequestAction = Action<TypesNames.CREATE_ANIMAL_REQUEST>;
export type CreateAnimalSuccessAction = Action<TypesNames.CREATE_ANIMAL_SUCCESS>;

export type GetAnimalListRequestAction = Action<TypesNames.GET_ANIMAL_LIST_REQUEST>;
export interface GetAnimalListSuccessAction extends Action<TypesNames.GET_ANIMAL_LIST_SUCCESS> {
	animalList: Animal[];
}

export type HideRemoveModalAction = Action<TypesNames.HIDE_REMOVE_MODAL>;

export type GetDeviceListAction = Action<TypesNames.GET_DEVICE_LIST>;

/* ------------- Define Any Interfaces ------------- */
export interface Device {
	_id: number;
	name: string;
	price: number;
	description: string;
	image: string;
	brand: string;
}
export interface Animal {
	_id: string;
	name: string;
	fameliyType?: string;
	description: string;
	lifeTime?: string;
	imgUrl?: string;
}
export type PageState = 'Gallery' | 'Create' | 'Edit';
