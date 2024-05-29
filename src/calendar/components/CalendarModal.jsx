import Modal from 'react-modal';
import './CalendarModal.css'
import { useState } from 'react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const onCloseModal = () => {
    console.log('cerrando modal')
} 

Modal.setAppElement('#root')

export const CalendarModal = () => {

    const [ isOpen, setIsOpen ] = useState(true)

    return (
        <Modal
            isOpen={true}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <h1>Hola cara perro</h1>
            <hr />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, harum accusantium? At illo asperiores, odio facere temporibus voluptates laborum obcaecati, fuga incidunt dignissimos ea architecto minima nostrum rerum explicabo fugiat.</p>
        </Modal>
    )
}
