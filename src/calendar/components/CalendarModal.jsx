import Modal from 'react-modal';
import './CalendarModal.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { addHours } from 'date-fns';

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

const initialFormValues = {
    title: 'titulo',
    notes: 'la nota (?)',
    start: new Date(),
    end: addHours(new Date(), 2)
}

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true)

    const [formState, setFormState] = useState(initialFormValues)

    const onInputChange = e => {
        const { name, value } = e.target

        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const onDateChange = (e, changing) => {
        setFormState(prevState => ({
            ...prevState,
            [changing]: e
        }))
    }

    return (
        <Modal
            isOpen={true}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container">

                <div className="form-group mb-2 d-flex flex-column">
                    <label className='form-label'>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formState.start}
                        className='form-control'
                        onChange={onDateChange}
                        dateFormat='Pp'
                    />
                </div>

                <div className="form-group mb-2 d-flex flex-column">
                    <label className='form-label'>Fecha y hora fin</label>
                    <DatePicker
                        selected={formState.end}
                        className='form-control'
                        onChange={onDateChange}
                        dateFormat='Pp'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formState.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formState.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
