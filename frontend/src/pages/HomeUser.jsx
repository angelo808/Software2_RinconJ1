import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Modal
} from "@mui/material";
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomeUser = () => {
  const { user, removeUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false)
  const [textNotificacion, setTextNotificacion] = useState('')
  const [tipoNotificacion, setTipoNotificacion] = useState(null)

  useEffect(()=>{
    fetchDatos()

    if (!user.isAdmin) {
      if (user.blocked == true) {
        setNotification(true);
        setTextNotificacion('Has sido bloqueado');
      } else if (tipoNotificacion == 'PAGO') {
        setNotification(true);
        setTextNotificacion('Acuérdate que en tu calendario colocaste hoy como fecha de pago.');
      } else if (tipoNotificacion == 'SIMULACIÓN') {
        setNotification(true);
        setTextNotificacion('Puedes realizar la simulación de entrevista.');
      } else if (tipoNotificacion == 'DS-160') {
        setNotification(true);
        setTextNotificacion('Puedes realizar la prueba del DS-160.');
      } else if (tipoNotificacion == 'ENTREVISTAEMP') {
        setNotification(true);
        setTextNotificacion('Tus documentos han sido aceptados, asegúrate de estar listo para tu entrevista y vuelo.');
      }
    } 
  }, [tipoNotificacion])

  const fetchDatos = async () => {
    const responseCalendar = await axios.get(`http://localhost:5001/api/events/user/${user._id}`)
    const filteredEvents = responseCalendar.data.filter(event => event.type === 'Pago');
    let isToday = false;
    if (filteredEvents.length != 0) {
      const date = new Date(filteredEvents[0].date);
      const today = new Date();   

      isToday = date.getUTCFullYear() === today.getUTCFullYear() && date.getUTCMonth() === today.getUTCMonth() && date.getUTCDate() === today.getUTCDate();
    }

    if (isToday) {
      setTipoNotificacion('PAGO')
    } else if (!user.entrevista) {
      setTipoNotificacion('SIMULACIÓN')
    } else if (!user.pruebads) {
      setTipoNotificacion('DS-160')
    } else if (user.documents.ds160.approved && user.documents.ds160.approved && user.documents.ds160.approved) {
      setTipoNotificacion('ENTREVISTAEMP')
    }
  }

  const validarNotificaciones = () => {
    if (user.blocked == true) {
      setNotification(false)
      removeUser()
      navigate("/");
    } else {
      setNotification(false)
    }
    
  }

  return (
    <div className="container m-auto p-4">
      <Modal
        open={notification}
        onClose={() => setNotification(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "#F6F4F3",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            backgroundColor: "#F6F4F3",
          }}
        >
          <div className="flex justify-between">
            <Typography id="modal-title" variant="h4" component="h1">
              Notificación
            </Typography>
            <Button color="error" onClick={() => validarNotificaciones()}>
            <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-4' viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></path></svg>
            </Button>
          </div>
          <Typography id="modal-description" variant="h6" component="h3" mb={2} mt={2}>
            {textNotificacion}
          </Typography>
        </Box>
      </Modal>
      <h1 className='text-4xl text-center mb-8'>Información del programa de Work and Travel</h1>
      <div className="agency-list">
        <div className="content-container">
          <img
            src="https://media.licdn.com/dms/image/C4D1BAQHOV6NCXQwY6Q/company-background_10000/0/1583324820213?e=2147483647&v=beta&t=TW9T6tQ_9zx5qLE9tJflGXfYa45A_wAbG2-nAdngMlc"
            alt="Work and Travel"
            className="responsive-image"
          />
          <h2 className='text-2xl'>Descripción</h2>
          <p><strong>El programa de Work and Travel</strong> es una oportunidad increíble para estudiantes universitarios de experimentar una aventura única en el extranjero. Este programa permite a los participantes trabajar y viajar durante sus vacaciones de verano, proporcionando una inmersión total en la cultura y el estilo de vida de otro país.</p>

          <h2 className="section-title">Objetivos del Programa</h2>
          <p>El principal objetivo del programa es ofrecer a los estudiantes la oportunidad de:</p>
          <ul>
            <li><strong>Adquirir experiencia laboral internacional.</strong></li>
            <li><strong>Mejorar sus habilidades en el idioma extranjero.</strong></li>
            <li><strong>Conocer nuevas culturas y formas de vida.</strong></li>
            <li><strong>Desarrollar habilidades personales y profesionales.</strong></li>
          </ul>

          <h2 className="section-title">Beneficios</h2>
          <p>Participar en el programa de Work and Travel tiene múltiples beneficios:</p>
          <ul>
            <li><strong>Experiencia laboral valiosa en el extranjero.</strong></li>
            <li><strong>Mejora significativa en la competencia lingüística.</strong></li>
            <li><strong>Desarrollo de una red internacional de contactos.</strong></li>
            <li><strong>Oportunidad de viajar y conocer lugares turísticos.</strong></li>
            <li><strong>Crecimiento personal a través de la independencia y la autogestión.</strong></li>
          </ul>

          <h2 className="section-title">Requisitos</h2>
          <p>Para ser elegible para el programa de Work and Travel, los estudiantes deben cumplir con los siguientes requisitos:</p>
          <ul>
            <li><strong>Ser estudiante universitario a tiempo completo.</strong></li>
            <li><strong>Tener entre 18 y 30 años.</strong></li>
            <li><strong>Poseer un nivel intermedio o avanzado del idioma del país de destino.</strong></li>
            <li><strong>Estar dispuesto a trabajar en diversos tipos de empleos temporales.</strong></li>
            <li><strong>Contar con una buena salud física y mental.</strong></li>
          </ul>

          <h2 className="section-title">Proceso de Aplicación</h2>
          <p>El proceso de aplicación al programa generalmente incluye los siguientes pasos:</p>
          <ul>
            <li><strong>Completar un formulario de solicitud en línea.</strong></li>
            <li><strong>Participar en una entrevista con el coordinador del programa.</strong></li>
            <li><strong>Proveer documentación requerida (pasaporte, certificado de estudios, etc.).</strong></li>
            <li><strong>Asistir a sesiones informativas y de orientación previas al viaje.</strong></li>
          </ul>

          <h2 className="section-title">Contacta con Nosotros</h2>
          <p>Si estás interesado en participar en el programa de Work and Travel o necesitas más información, no dudes en contactarnos:</p>
          <p>Email: <strong>info@workandtravel.com</strong></p>
          <p>Teléfono: <strong>+123 456 7890</strong></p>
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
