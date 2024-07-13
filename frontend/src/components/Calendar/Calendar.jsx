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
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { API_URL } from "../../constants";

const colorConfigs = {
  busySchedule: "#fbbf24",
  busyScheduleTitle: "#fbbf24",
  freeSchedule: "#3b82f6",
  freeScheduleTitle: "#3b82f6",
};

const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");
const formatTime = (date) => dayjs(date).format("HH:mm");

const handleDelete = async (deleteId) => {
  try {
    await axios.delete(`${API_URL}/events/${deleteId}`);
    toast.success("El horario fue eliminado exitosamente");
    return deleteId;
  } catch (error) {
    toast.error("Ha ocurrido un error al eliminar el horario");
    console.error(error);
  }
};

const PanelRegistro = ({ scheduler }) => {
  const event = scheduler?.edited || {};
  const [fecha, setFecha] = useState(dayjs(event.start || new Date()));
  const [horaIni, setHoraIni] = useState(dayjs(event.start || new Date()));
  const [horaFin, setHoraFin] = useState(dayjs(event.end || new Date()));
  const [type, setType] = useState("");
  const [state, setState] = useState({
    title: event.title || "",
    enlace: event.enlace || "",
    email: event.email || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {}, [fecha, horaIni, horaFin]);

  const handleChange = (value, name) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAvailability = async (action, datosEvento) => {
    const datosEvento2 = {
      nombre: datosEvento.nombre,
      dia: dayjs(datosEvento.fecha).format("YYYY-MM-DD"),
      hora_inicio: dayjs(datosEvento.horaIni).format("HH:mm"),
      hora_fin: dayjs(datosEvento.horaFin).format("HH:mm"),
      tipo: datosEvento.tipo,
      email: datosEvento.email,
    };

    try {
      let response;
      if (action === "create") {
        response = await axios.post(`${API_URL}/events`, datosEvento2);
        toast.success("El horario fue registrado exitosamente");
      } else if (action === "edit") {
        response = await axios.put(`${API_URL}/events/${event.event_id}`, datosEvento2);
        toast.success("El horario fue editado exitosamente");
      }
      const data = response.data;
      return {
        event_id: data._id,
        title: data.nombre,
        start: new Date(`${data.dia}T${data.hora_inicio}`),
        end: new Date(`${data.dia}T${data.hora_fin}`),
        enlace: data.enlace,
        color: data.libre ? colorConfigs.freeSchedule : colorConfigs.busySchedule,
        libre: data.libre,
      };
    } catch (error) {
      scheduler.loading(false);
      scheduler.close();
      toast.error(error.response?.data.error || "Ha ocurrido un error al guardar el horario");
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const timeAct = new Date();
    const timeInicio = new Date(`${formatDate(fecha)}T${formatTime(horaIni)}`);

    if (state.title.length < 3) return setError("Mínimo 3 caracteres para el título");
    if (horaFin <= horaIni) return setError("La hora de fin debe ser mayor que la hora de inicio");
    if (timeInicio <= timeAct) return setError("La fecha y hora de inicio deben ser futuras");

    try {
      scheduler.loading(true);
      const datosEvento = {
        nombre: state.title,
        dia: fecha,
        hora_inicio: horaIni,
        hora_fin: horaFin,
        tipo: type,
        email: state.email,
      };

      const added_updated_event = await handleSaveAvailability(event ? "edit" : "create", datosEvento);
      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      scheduler.close();
    } catch (error) {
      scheduler.loading(false);
      console.error(error);
    } finally {
      scheduler.loading(false);
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
      <Box>
        <Typography variant="h6">Registrar Horario</Typography>
        <IconButton onClick={() => scheduler.close()} style={{ position: "absolute", top: 5, right: 5 }}>
          <FaTimes />
        </IconButton>
      </Box>
      <Box p={2}>
        <TextField
          fullWidth
          label="Título"
          value={state.title}
          onChange={(e) => handleChange(e.target.value, "title")}
          error={error && state.title.length < 3}
          helperText={error && state.title.length < 3 && error}
        />
        <Box mt={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={es}>
            <DatePicker
              label="Fecha"
              value={fecha}
              onChange={(date) => setFecha(date)}
              renderInput={(props) => <TextField {...props} />}
            />
            <TimePicker
              label="Hora de inicio"
              value={horaIni}
              onChange={(time) => setHoraIni(time)}
              renderInput={(props) => <TextField {...props} />}
            />
            <TimePicker
              label="Hora de fin"
              value={horaFin}
              onChange={(time) => setHoraFin(time)}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
        </Box>
        <Box mt={2}>
          <FormControl fullWidth>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              displayEmpty
              fullWidth
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">Seleccione</MenuItem>
              <MenuItem value="digital">Digital</MenuItem>
              <MenuItem value="academic">Académico</MenuItem>
              <MenuItem value="interview">Entrevista</MenuItem>
              <MenuItem value="other">Otro</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            label="Correo electrónico"
            value={state.email}
            onChange={(e) => handleChange(e.target.value, "email")}
          />
        </Box>
        <Box mt={2}>
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
            Guardar
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export const Calendar = () => {
  return (
    <Scheduler
      view="month"
      customEditor={(scheduler) => <PanelRegistro scheduler={scheduler} />}
      onDelete={(deleteId) => handleDelete(deleteId)}
      events={[
        {
          event_id: 1,
          title: "Reunion 1",
          start: new Date("2024-06-29T00:00:00"),
          end: new Date("2024-06-29T24:00:00"),
        },
        {
          event_id: 2,
          title: "Event 2",
          start: new Date("2021-05-04T10:00:00"),
          end: new Date("2021-05-04T11:00:00"),
        },
      ]}
      locale={es}
      translations={{
        navigation: {
          month: "Mes",
          week: "Semana",
          day: "Día",
          today: "Hoy",
          previous: "Anterior",
          next: "Siguiente",
        },
      }}
    />
  );
};
