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
import axiosBase from "../../axios/axiosBase";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const colorConfigs = {
  busySchedule: "#fbbf24",
  busyScheduleTitle: "#fbbf24",
  freeSchedule: "#3b82f6",
  freeScheduleTitle: "#3b82f6",
};

const formatDate = (date) => date.format("YYYY-MM-DD");
const formatTime = (date) => date.format("HH:mm");

const handleDelete = async (deleteId) => {
  try {
    await axiosBase().delete(`/calendario/${deleteId}/`);
    toast.success("El horario fue eliminado exitosamente");
    return deleteId;
  } catch (error) {
    toast.error("Ha ocurrido un error al eliminar el horario");
    console.error(error);
  }
};

const PanelRegistro = ({ scheduler }) => {
  const event = scheduler.edited;
  const [fecha, setFecha] = useState(dayjs(scheduler.state.start.value));
  const [horaIni, setHoraIni] = useState(dayjs(scheduler.state.start.value));
  const [horaFin, setHoraFin] = useState(dayjs(scheduler.state.end.value));
  const [type, setType] = useState("");
  const [state, setState] = useState({
    title: event?.title || "",
    enlace: event?.enlace || "",
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
      dia: formatDate(datosEvento.dia),
      hora_inicio: formatTime(datosEvento.hora_inicio),
      hora_fin: formatTime(datosEvento.hora_fin),
      tipo: datosEvento.tipo,
    };

    try {
      let response;
      if (action === "create") {
        response = await axiosBase().post("/calendario/", datosEvento2);
        toast.success("El horario fue registrado exitosamente");
      } else if (action === "edit") {
        response = await axiosBase().patch(`/calendario/${event?.event_id}/`, datosEvento2);
        toast.success("El horario fue editado exitosamente");
      }
      const data = response.data;
      return {
        event_id: data.id_disponibilidad,
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
      toast.error(error.response.data);
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const timeAct = new Date();
    const timeInicio = new Date(`${formatDate(fecha)}T${formatTime(horaIni)}`);

    if (state.title.length < 3) return setError("Minimo 3 caracteres");
    if (horaFin <= horaIni) return setError("");
    if (timeInicio <= timeAct) return setError("");

    try {
      scheduler.loading(true);
      const datosEvento = {
        nombre: state.title,
        dia: fecha,
        hora_inicio: horaIni,
        hora_fin: horaFin,
        tipo: type,
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
  return (
    <Scheduler
      view="month"
      customEditor={(scheduler) => <PanelRegistro scheduler={scheduler} />}
      onDelete={(deleteId) => handleDelete(deleteId)}
      events={[
        {
          event_id: 1,
          title: "Reunion 1",
          start: new Date("2024/6/29 00:00"),
          end: new Date("2024/6/29 24:00"),
        },
        {
          event_id: 2,
          title: "Event 2",
          start: new Date("2021/5/4 10:00"),
          end: new Date("2021/5/4 11:00"),
        },
      ]}
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

