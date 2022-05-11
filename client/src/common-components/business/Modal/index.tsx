import * as React from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button } from 'react-bootstrap';

import './style.scss';

export interface Props {
	onSubmitClick?: Function;
	onCancleClick?: () => void;
	title?: string;
	isOpen?: boolean;
	buttons: ModalButton[];
	subTitle?: string;
}
export interface ModalButton {
	id: string;
	contant: string;
	clickHandle: any;
	isPrimary: boolean;
}
const GenericModal: React.FC<Props> = (props: Props) => {
	const { onCancleClick, title, subTitle, isOpen = false } = props;
	const getAllButtons = () => {
		const { buttons } = props;
		return buttons.map(button => (
			<Button
				key={button.id}
				onClick={() => button.clickHandle()}
				className={button.isPrimary ? 'cancle-button' : 'remove-button'}
			>
				{button.contant}
			</Button>
		));
	};
	return (
		<Modal open={isOpen} onClose={onCancleClick}>
			<Fade in={isOpen}>
				<div className="modal-container">
					<div className="top-border"> {title}</div>
					<div className="content" id="modal-modal-description">
						{subTitle}
					</div>
					<div className="footer">{getAllButtons()}</div>
				</div>
			</Fade>
		</Modal>
	);
};
export default GenericModal;
