import * as React from 'react';

import {
    Card,
    Grid,
    CardContent,
    Typography,
    CardActions,
    CardMedia
} from '@mui/material';
import { Device, Animal } from 'actions/catalog/interface';
import './style.scss';
import Button from 'react-bootstrap/esm/Button';
import { RiBearSmileFill } from 'react-icons/ri';
import { ImBin2 } from 'react-icons/im';
import { VscEdit } from 'react-icons/vsc';

export interface Props {
    animal: Animal;
    onBuyClick?: (device: Device) => void;
    onRemoveClick?: (id?: any) => void;
    isCanRemove?: boolean;
    onEditClick?: () => void;
}

const AnimalCard: React.FC<Props> = (props: Props) => {
    const { animal, onEditClick, onRemoveClick, isCanRemove = true } = props;

    if (!animal) return null;

    return (
        <Grid container key={animal._id} className="device-card-col">
            <Card className="device-card">
                <CardContent className="device-card-content">
                    <Grid container>
                        <Grid item xs={12}>
                            <RiBearSmileFill style={{ fontSize: 40 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <CardMedia
                                className="device-card-img"
                                image={animal.imgUrl || ''}
                                title="device-card-img"
                            />
                        </Grid>
                        <Grid className="animal-name-cont" item xs={12}>
                            <Typography
                                className="animal-name"
                                variant="h5"
                                component="h2"
                                data-automation-id="card-title"
                            >
                                {animal.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" component="p" data-automation-id="card-title">
                                Life Time: {animal.lifeTime || ''}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" component="p">
                                {animal.description || ''}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions style={{ display: 'inherit' }}>
                    {isCanRemove && onRemoveClick && (
                        <Button onClick={() => onRemoveClick()} className="remove-animal-button">
                            <ImBin2 fontSize={25} />
                        </Button>
                    )}
                    {onEditClick && isCanRemove && (
                        <Button onClick={() => onEditClick()} className="edit-animal-button">
                            <VscEdit fontSize={25} />
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default AnimalCard;
