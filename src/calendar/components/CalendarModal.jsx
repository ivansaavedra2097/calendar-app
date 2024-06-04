import Modal from 'react-modal';
import './CalendarModal.css'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks';

registerLocale('es', es)

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

Modal.setAppElement('#root')

const initialFormValues = {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
}

export const CalendarModal = () => {
    const { isDateModalOpen, closeDateModal } = useUiStore()

    const [ formSubmited, setFormSubmited] = useState(false)

    const [formState, setFormState] = useState(initialFormValues)

    const { activeEvent, startSavingEvent } = useCalendarStore()
    

    const titleClass = useMemo(() => {
        if(!formSubmited) return ''

        return (formState.title.trim().length > 0 ) 
        ? ''
        : 'is-invalid'
    }, [formState.title, formSubmited])

    useEffect(() => {
      if( activeEvent !== null ) {
        setFormState({ ...activeEvent })
      }
     }, [activeEvent])
    

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

    const onSubmit = (e) => {
        e.preventDefault()
        setFormSubmited(true)
        const difference = differenceInSeconds( formState.end, formState.start )
        console.log({ difference })
        if( isNaN( difference ) || difference <=0  ) {
            console.log('Error en fechas')
            Swal.fire("Fechas incorrectas","La fecha introducida es invalida","error")
            return;
        }

        if( formState.title.trim().length === 0 ) return 

        console.log({ formState })

        //TODO
        startSavingEvent( formState )
        closeDateModal()
        setFormSubmited(false)
        //cerrar modal
        //Remover errores en pantalla
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={closeDateModal}
            style={customStyles}
            className='modal'
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2 d-flex flex-column">
                    <label className='form-label'>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formState.start}
                        className='form-control'
                        onChange={(e) => onDateChange(e,'start')}
                        dateFormat='Pp'
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                        value={formState.start}
                    />
                </div>

                <div className="form-group mb-2 d-flex flex-column">
                    <label className='form-label'>Fecha y hora fin</label>
                    <DatePicker
                        selected={formState.end}
                        className='form-control'
                        onChange={(e) => onDateChange(e,'end')}
                        dateFormat='Pp'
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                        value={formState.end}
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
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
