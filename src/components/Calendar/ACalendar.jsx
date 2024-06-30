import React, { useState, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { UserContext } from '../../context/UserContext';

const localizer = momentLocalizer(moment);

const ACalendar = () => {
    const { user } = useContext(UserContext);
    const [events, setEvents] = useState([
        { title: 'Pago 1', start: new Date(2023, 5, 1), end: new Date(2023, 5, 1) },
        { title: 'Pago 2', start: new Date(2023, 5, 11), end: new Date(2023, 5, 11) },
        { title: 'Entrevista', start: new Date(2023, 5, 27), end: new Date(2023, 5, 27) },
    ]);

    const handleSelectSlot = ({ start, end }) => {
        const title = window.prompt('Nuevo Evento: nombre');
        if (title) {
            setEvents([...events, { start, end, title }]);
        }
    };

    const handleSelectEvent = (event) => {
        const action = window.prompt(`Acción para el evento "${event.title}": (editar/eliminar)`);
        if (action === 'editar') {
            const title = window.prompt('Nuevo nombre del evento:', event.title);
            if (title) {
                setEvents(events.map(e => e === event ? { ...e, title } : e));
            }
        } else if (action === 'eliminar') {
            setEvents(events.filter(e => e !== event));
        }
    };

    return (
        <div>
            <h2>Calendario de {user?.name}</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                style={{ height: 500, margin: "50px" }}
            />
        </div>
    );
};

export default ACalendar;
