import * as React from 'react';
import { Dispatch } from 'redux';
import { ApplicationState } from 'actions';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { Grid, FormControl, Input } from '@mui/material';
import './style.scss';
import { Button } from 'react-bootstrap';
import { MdOutlinePets } from 'react-icons/md';
import AnimalCard from 'common-components/business/AnimalCard';
import {
    Animal,
    GetAnimalListRequestFunction,
    HideRemoveModalFunction,
    ShowRemoveModalFunction,
    RemoveAnimalProcessStartFunction,
    SetPageStateFunction,
    PageState,
} from 'actions/catalog/interface';
import { CatalogActions, catalogSelector } from 'actions/catalog';
import GenericModal, { ModalButton } from 'common-components/business/Modal';
import { history } from '@base/features';

interface Props {
    getAllAnimals: typeof GetAnimalListRequestFunction;
    animalList: Animal[];
    hideModal: typeof HideRemoveModalFunction;
    showModal: typeof ShowRemoveModalFunction;
    isModalOpen: boolean;
    removeAnimal: typeof RemoveAnimalProcessStartFunction;
    setPageState: typeof SetPageStateFunction;
}
interface State {
    searchValue: string;
}

class AnimalGallery extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            searchValue: '',
        };
    }

    componentDidMount() {
        const { getAllAnimals } = this.props;
        getAllAnimals();

        // loadRBAData();
    }
    getModalButtons() {
        const { hideModal, removeAnimal } = this.props;

        const modalButtons: ModalButton[] = [
            {
                clickHandle: hideModal,
                id: '1',
                contant: 'Cancle',
                isPrimary: true,
            },
            {
                clickHandle: removeAnimal,
                id: '1',
                contant: 'Remove',
                isPrimary: false,
            },
        ];
        return modalButtons;
    }
    getAllAnimals() {
        const { animalList, showModal, setPageState } = this.props;
        const { searchValue } = this.state;
        if (animalList && animalList.length > 0) {
            return animalList.map((animal: Animal) => {
                if (!searchValue || animal.name.toLowerCase().includes(searchValue)) {
                    return (
                        <Grid key={animal._id} item xs={12} sm={6} md={4}>
                            <AnimalCard
                                onRemoveClick={(animalId?: string) => showModal(animal._id)}
                                animal={animal}
                                onEditClick={() => setPageState('Edit', animal) && history.push('/modify-animal')}
                            ></AnimalCard>
                        </Grid>
                    );
                }
                return null;
            });
        }
        return null;
    }

    render() {
        const { isModalOpen, setPageState } = this.props;

        return (
            <>
                <div className="animal-root">
                    <Grid className="title-icon" spacing="2" container direction="row" justifyContent="center">
                        <MdOutlinePets fontSize="25px" size="2em" />
                    </Grid>

                    <Grid className="title" spacing="2" container direction="row" justifyContent="center">
                        Animals Gallery
					</Grid>
                    <Grid className="gallery" container justifyContent="space-between">
                        <Grid container xs={8} justifyContent="flex-start" item>
                            <FormControl>
                                <Input
                                    type="text"
                                    data-automation-id="filter-input"
                                    placeholder="Search"
                                    onChange={(e: any) => this.setState({ searchValue: e.target.value.toLowerCase() })}
                                />
                            </FormControl>
                        </Grid>
                        <Grid>
                            <Button
                                onClick={() => setPageState('Create') && history.push('/modify-animal')}
                                className="add-animal-button"
                            >
                                Add Animals
							</Button>
                        </Grid>
                    </Grid>
                    <Grid className="search-filter" container spacing={2} justifyContent="space-between">
                        {this.getAllAnimals()}
                    </Grid>

                </div>
                <GenericModal
                    isOpen={isModalOpen}
                    title={'Remove Item'}
                    subTitle="Do you sure that you  want delete this item?"
                    buttons={this.getModalButtons() as ModalButton[]}
                ></GenericModal>
            </>
        );
    }
}

export default baseConnect(
    AnimalGallery,
    (state: ApplicationState) => ({
        animalList: catalogSelector.animals(state),
        isModalOpen: catalogSelector.modalState(state),
    }),
    (dispatch: Dispatch) => ({
        getAllAnimals: () => dispatch(CatalogActions.getAnimalListRequest()),
        showModal: (animalId: string) => dispatch(CatalogActions.showRemoveModal(animalId)),
        hideModal: () => dispatch(CatalogActions.hideRemoveModal()),
        removeAnimal: () => dispatch(CatalogActions.removeAnimalProcessStart()),
        setPageState: (pageState: PageState, animal: Animal) =>
            dispatch(CatalogActions.setPageState(pageState, animal)),
    })
);
