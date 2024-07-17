import { Scheduler } from "@aldabil/react-scheduler";
import es from "date-fns/locale/es";
import "dayjs/locale/es";
import dayjs from "dayjs";
import {
  Button,
  Typography,
  Box,
  IconButton,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import axiosBase from "../../axios/axiosBase";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { UserContext } from "../../context/UserContext";

const colorConfigs = {
  busySchedule: "#fbbf24",
  busyScheduleTitle: "#fbbf24",
  freeSchedule: "#3b82f6",
  freeScheduleTitle: "#3b82f6",
};

// const userId = JSON.parse(localStorage.getItem("user") || {"_id":"6657560e2a62a32ce5be74a8"})._id

const formatDate = (date) => date.format("YYYY-MM-DD");
const formatTime = (date) => date.format("YYYY-MM-DD HH:mm");

const handleDelete = async (deleteId) => {
  try {
    await axiosBase.delete(`/events/${deleteId}`); // Asegúrate de que la ruta sea correcta
    toast.success("El horario fue eliminado exitosamente");
    return deleteId;
  } catch (error) {
    toast.error("Ha ocurrido un error al eliminar el horario");
    console.error(error);
  }
};

const PanelRegistro = ({ scheduler }) => {
  const event = scheduler?.edited;
  const { user } = useContext(UserContext);
  const [fecha, setFecha] = useState(dayjs(scheduler?.state?.start?.value));
  const [horaIni, setHoraIni] = useState(dayjs(scheduler?.state?.start?.value));
  const [horaFin, setHoraFin] = useState(dayjs(scheduler?.state?.end?.value));
  const [type, setType] = useState(event?.tipo || "");
  const [state, setState] = useState({
    title: event?.title || "",
    enlace: event?.enlace || "",
    email: event?.email || "", // Añadir campo de correo electrónico
  });
  const [error, setError] = useState("");
  

  useEffect(() => {console.log(scheduler)}, [fecha, horaIni, horaFin]);

  const handleChange = (value, name) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAvailability = async (action, datosEvento) => {

    const datosEvento2 = {
      name: datosEvento.nombre,
      description: '', 
      date: new Date(formatDate(datosEvento.dia)), 
      startHour: new Date(formatTime(datosEvento.hora_inicio)), 
      endHour: new Date(formatTime(datosEvento.hora_fin)), 
      type: datosEvento.tipo,
      email: datosEvento.email,
      userId: user._id, // Parse user ID from localStorage
    };

    try {
      let response;
      if (action === "create") {
        response = await axiosBase.post("/events", datosEvento2); 
        toast.success("El horario fue registrado exitosamente");
      } else if (action === "edit") {
        response = await axiosBase.put(`/events/${event?.event_id}`, datosEvento2);
        toast.success("El horario fue editado exitosamente");
      }
      const data = response.data;
      return {
        event_id: data._id,
        title: data.name,
        start: new Date(data.startHour),
        end: new Date(data.endHour),
        email: data.email,
        tipo: data.type,
        userId: data.userId
      };
    } catch (error) {
      scheduler.loading(false);
      scheduler.close();
      toast.error(error.response.data);
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const timeAct = dayjs();
    const timeInicio = dayjs(fecha).hour(horaIni.hour()).minute(horaIni.minute());

    if (state.title.length < 3) {
      return setError("El título debe tener al menos 3 caracteres");
    } else if (horaFin <= horaIni) {
      return setError("La hora de fin debe ser posterior a la hora de inicio");
    } else if (timeInicio.isBefore(timeAct)) {
      return setError("No puedes crear un evento en un día que ya ha transcurrido");
    } else if (!type) {
      return setError("Debes seleccionar un tipo de evento");
    } else {
      try {
        scheduler.loading(true);

        const datosEvento = {
          nombre: state.title,
          dia: fecha,
          hora_inicio: horaIni,
          hora_fin: horaFin,
          tipo: type,
          email: state.email,
          userId: user._id,
        };

        const mode = event ? "edit" : "create";
        if (mode === "edit" && (!event.start || !event.end)) {
          throw new Error("Evento inválido para edición");
        }

        const added_updated_event = await handleSaveAvailability(mode, datosEvento);
        scheduler.onConfirm(added_updated_event, mode);
        scheduler.close();
      } catch (error) {
        scheduler.loading(false);
        console.error("Error al manejar el evento:", error);
      } finally {
        scheduler.loading(false);
      }
    }
  };


  return (
    <div
      style={{
        backgroundColor: "white",
        paddingTop: "75px",
        height: "100%",
        width: "400px",
        position: "fixed",
        top: 0,
        right: 0,
      }}
    >
      <Box sx={{ display: "flex", position: "sticky", top: 0 }}>
        <Box sx={{ width: "90%", paddingLeft: "25px" }}>
          <Typography variant="h6" align="left" color="secondary">
            <strong>{event ? "Editar Fecha" : "Crear Fecha"}</strong>
          </Typography>
        </Box>
        <Box sx={{ width: "10%", mt: -0.5, mr: -0.5, paddingRight: "10%" }}>
          <IconButton onClick={scheduler.close}>
            <FaTimes />
          </IconButton>
        </Box>
      </Box>

      <Box container sx={{ marginBottom: 2, paddingInlineStart: 3, paddingBlockEnd: 3 }}>
        <Box item xs={12} sm={12} sx={{ paddingRight: 1, paddingTop: 2, display: "flex", alignItems: "flex-start" }}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>Título *</Typography>
        </Box>
        <Box item xs={12} sm={12} sx={{ paddingRight: 1, paddingTop: 0, display: "flex", alignItems: "flex-start" }}>
          <TextField
            value={state.title}
            onChange={(e) => handleChange(e.target.value, "title")}
            error={!!error}
            helperText={error}
            sx={{ width: "90%" }}
          />
        </Box>

        <Box item xs={12} sm={12} sx={{ paddingRight: 1, paddingTop: 2, display: "flex", alignItems: "flex-start" }}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>Correo Electrónico *</Typography>
        </Box>
        <Box item xs={12} sm={12} sx={{ paddingRight: 1, paddingTop: 0, display: "flex", alignItems: "flex-start" }}>
          <TextField
            value={state.email}
            onChange={(e) => handleChange(e.target.value, "email")}
            error={!!error}
            helperText={error}
            sx={{ width: "90%" }}
          />
        </Box>

        <Box item xs={12} sm={12} sx={{ paddingRight: 1, paddingTop: 2, display: "flex", alignItems: "flex-start" }}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>Fecha *</Typography>
        </Box>
        <Box item xs={12} sm={12} sx={{ paddingRight: 1, paddingTop: 0, display: "flex", alignItems: "flex-start" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DatePicker sx={{ width: "90%" }} value={fecha} onChange={(valor) => setFecha(valor)} />
          </LocalizationProvider>
        </Box>

        <Box item xs={12} sm={12} sx={{ paddingRight: 1, paddingTop: 2, display: "flex", alignItems: "flex-start" }}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>Hora de Inicio *</Typography>
        </Box>
        <Box item xs={12} sm={12} sx={{ paddingRight: 1, paddingTop: 0, display: "flex", alignItems: "flex-start" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <TimePicker sx={{ width: "90%" }} value={horaIni} onChange={(valor) => setHoraIni(valor)} />
          </LocalizationProvider>
        </Box>

        <Box item xs={12} sm={12} sx={{ paddingRight: 1, paddingTop: 2, display: "flex", alignItems: "flex-start" }}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>Hora de Fin *</Typography>
        </Box>
        <Box item xs={12} sm={12} sx={{ paddingRight: 1, paddingTop: 0, display: "flex", alignItems: "flex-start" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <TimePicker sx={{ width: "90%" }} value={horaFin} onChange={(valor) => setHoraFin(valor)} />
          </LocalizationProvider>
        </Box>

        <Box item xs={12} sm={12} sx={{ paddingRight: 1, paddingTop: 2, display: "flex", alignItems: "flex-start" }}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>Tipo de Evento</Typography>
        </Box>
        <Box item xs={12} sm={12} sx={{ paddingRight: 1, paddingTop: 0, display: "flex", alignItems: "flex-start" }}>
          <FormControl fullWidth variant="standard">
            <Select
              labelId="payment-select-label"
              id="payment-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="Pago">Pago</MenuItem>
              <MenuItem value="Entrevista">Entrevista con el empleador</MenuItem>
              <MenuItem value="Cita">Cita con el embajada</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ paddingTop: 3, display: "flex", justifyContent: "end", width: "100%", paddingRight: "12%" }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ textTransform: "capitalize" }}
            onClick={handleSubmit}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  

  
  useEffect(() => {
    setLoading(true)
    axiosBase.get(`/events/user/${user._id}`).then((response) => {
      setEvents(response.data.map((d)=> (
        {
          event_id: d["_id"],
          title: d["name"],
          start: new Date(d["startHour"]),
          end: new Date(d["endHour"]),
          color: colorConfigs.freeSchedule,
          tipo: d["type"],
          email: d["email"],
          editable: new Date(d["startHour"]) >  new Date(),
          deletable: new Date(d["endHour"]) >  new Date(),
          draggable: false
        }
      )));
      setLoading(false);
      
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    })
  }, [])

  return (
    <Scheduler
      view="month"
      customEditor={(scheduler) => <PanelRegistro scheduler={scheduler} />}
      onDelete={(deleteId) => handleDelete(deleteId)}
      events={events}
      locale={es}
      translations={{
        navigation: {
          month: "Mes",
          week: "Semana",
          day: "Día",
          today: "Hoy",
        },
        form: {
          addTitle: "Añadir horario",
          editTitle: "Editar horario",
          confirm: "Confirmar",
          delete: "Eliminar",
          cancel: "Cancelar",
        },
        event: {
          title: "Título",
          start: "Hora de inicio",
          end: "Hora de fin",
          allDay: "Todo el día",
        },
        validation: {
          required: "Requerido",
          invalidEmail: "Correo no válido",
          onlyNumbers: "Solo números están permitidos",
          min: "Mínimo 3 letras",
          max: "Máximo 3 letras",
        },
        moreEvents: "Más...",
        loading: "Cargando...",
      }}
      draggable={false}
      week={{
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 1,
        startHour: 6,
        endHour: 24,
        step: 60,
        cellRenderer: ({ start, onClick, ...props }) => {
          const time = new Date();
          const disabled = start < time;
          const restProps = disabled ? {} : props;
          return (
            <Button
              style={{
                height: "100%",
                background: disabled ? "#d6d1d1" : "transparent",
                cursor: disabled ? "auto" : "pointer",
              }}
              onClick={() => {
                if (!disabled) onClick();
              }}
              disableRipple={disabled}
              {...restProps}
            />
          );
        },
      }}
    />
  );
};

export default Calendar;