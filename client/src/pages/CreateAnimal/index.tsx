import * as React from 'react';
import { Dispatch } from 'redux';
import { baseConnectForm } from '@base/features/base-redux-react-connect';
import { Grid, Button } from '@mui/material';
import './style.scss';
import { ApplicationState } from 'actions';
import { CatalogActions, catalogSelector } from 'actions/catalog';
import withErrorHandler from 'containers/ErrorHandler/withErrorHandler';
import { InjectedFormProps, getFormValues, initialize } from 'redux-form';
import { FieldInput } from 'common-components/controllers';
import { required, maxLength, alphaNumeric } from 'utils/validations';
import AnimalCard from 'common-components/business/AnimalCard';
import { v4 as uuidv4 } from 'uuid';
import { CreateAnimalRequestFunction, PageState, Animal, EditAnimalRequestFunction } from 'actions/catalog/interface';
import { Redirect } from 'react-router-dom';

interface Props {
	formName: string;
}
export interface OwnProps extends Props {
	formValues: any;
	createAnimal: typeof CreateAnimalRequestFunction;
	isJustConfirm: boolean;
	isCreate?: boolean;
	pagaState: PageState;
	selectedAnimal?: Animal;
	editAnimal: typeof EditAnimalRequestFunction;
	initForm: (formName: string, formData: any) => void;
}

@withErrorHandler({
	errorCodes: ['devicesListFailed_206'],
	asComponent: true, // if set to false, all the component will be replaced with ErrorComponent by default
})
class CreateAnimal extends React.Component<OwnProps & InjectedFormProps> {
	componentDidMount() {
		const { pagaState, selectedAnimal, initForm } = this.props;
		if (pagaState === 'Edit' && selectedAnimal) {
			initForm('createAnimal', {
				name: selectedAnimal.name || '',
				lifeTime: selectedAnimal.lifeTime || '',
				imgUrl: selectedAnimal.imgUrl || '',
				description: selectedAnimal.description || '',
			});
		} else {
			initForm('createAnimal', {
				name: '',
				lifeTime: '',
				imgUrl: '',
				description: '',
			});
		}
	}
	getAnimal() {
		const { formValues } = this.props;
		return {
			_id: uuidv4(),
			name: formValues.name,
			lifeTime: formValues.lifeTime || '',
			imgUrl: formValues.imgUrl || '',
			description: formValues.description || '',
		};
	}

	render() {
		const { handleSubmit, formName, formValues, isJustConfirm, pagaState } = this.props;
		const handleConfirm = (): any => {
			const { createAnimal, pagaState, editAnimal, selectedAnimal } = this.props;
			if (pagaState === 'Create') {
				createAnimal();
			} else {
				editAnimal(selectedAnimal ?._id || '');
			}
		};
		return !isJustConfirm ? (
			<>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<div className="title">{pagaState} Animal </div>
					</Grid>
					<Grid item xs={12}>
						<div className="sub-title">{pagaState} And Add Your Animal to the Gallery</div>
					</Grid>

					<Grid className="form-placing" container xs={6}>

						<form name={formName} onSubmit={handleSubmit(this.hanldeSubmit.bind(this))}>
							<Grid className="line" item xs={12}>
								<div className="qa-title">Animal Name:</div>
								<FieldInput
									name="name"
									type="text"
									placeholder="AnimalName"
									validate={[required, maxLength]}
									warn={alphaNumeric}
								></FieldInput>
							</Grid>
							<Grid className="line" item xs={12}>
								<div className="qa-title">Animal Life:</div>
								<FieldInput
									name="lifeTime"
									type="text"
									placeholder="life Time"
									validate={[maxLength]}
								></FieldInput>
							</Grid>
							<Grid className="line" item xs={12}>
								<div className="qa-title">Add Image url :</div>
								<FieldInput name="imgUrl" type="text" placeholder="Set image url "></FieldInput>
							</Grid>
							<Grid className="line" item xs={12}>
								<div className="qa-title">Add Short discription :</div>
								<FieldInput
									name="description"
									type="text"
									placeholder="set short description "
									validate={[maxLength]}
								></FieldInput>
							</Grid>
							{formValues && formValues.name && (
								<Grid className="button-container" container xs={12}>
									<Button onClick={handleConfirm} variant="contained" color="success">
										Save
						           </Button>
								</Grid>
							)}
						</form>
					</Grid>
					{formValues && formValues.name && (
						<Grid container className="example" justifyContent="flex-end" xs={4}>
							<Grid className="example" item xs={12}>
								<div className="sub-example">Example:</div>
							</Grid>
							<div className="sub-example">
								<AnimalCard isCanRemove={false} animal={this.getAnimal()}></AnimalCard>
							</div>
						</Grid>
					)}

				</Grid>

			</>
		) : (
				<Redirect to="/" />
			);
	}
	hanldeSubmit() { }
}

export default baseConnectForm<any, any, Props>(
	CreateAnimal,
	(state: ApplicationState) => ({
		formValues: getFormValues('createAnimal')(state),
		isJustConfirm: catalogSelector.isJustConfirm(state),
		pagaState: catalogSelector.pageState(state),
		selectedAnimal: catalogSelector.selectedAnimal(state),
	}),
	(dispatch: Dispatch) => ({
		createAnimal: () => dispatch(CatalogActions.createAnimalRequest()),
		initForm: (formName: string, formData: any) => dispatch(initialize(formName, formData)),
		editAnimal: (animalId: string) => dispatch(CatalogActions.editAnimalRequest(animalId)),
	}),
	{
		destroyOnUnmount: false,
	}
);
