import { Scheduler } from "@aldabil/react-scheduler";
import es from "date-fns/locale/es";
import dayjs from "dayjs";
import { Button, Typography, Box, IconButton, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import { Fragment, useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axiosBase from "../../axios/axiosBase";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

const colorConfigs = {
  busySchedule: "#fbbf24",
  busyScheduleTitle: "#fbbf24",
  freeSchedule: "#3b82f6",
  freeScheduleTitle: "#3b82f6",
};

const Calendar = () => {
  const handleDelete = async (deleteId) => {
    return await new Promise((res) => {
      axiosBase.delete(`/events/${deleteId}`).then(() => {
        toast.success("El evento fue eliminado exitosamente");
        res(deleteId);
      }).catch(() => {
        toast.error("Ha ocurrido un error al eliminar el evento");
      });
    });
  };

  const handleSave = async (event, action, data, scheduler) => {
    const datosEvento = {
      title: data.title,
      start: data.start,
      end: data.end,
      type: data.type,
    };

    return await new Promise((res) => {
      if (action === "create") {
        axiosBase.post("/events", datosEvento).then((response) => {
          toast.success("El evento fue registrado exitosamente");
          res(response.data);
        }).catch((err) => {
          scheduler.loading(false);
          scheduler.close();
          toast.error(err.response.data);
        });
      } else if (action === "edit") {
        axiosBase.put(`/events/${event.event_id}`, datosEvento).then((response) => {
          toast.success("El evento fue editado exitosamente");
          res(response.data);
        }).catch((err) => {
          scheduler.loading(false);
          scheduler.close();
          toast.error(err.response.data);
        });
      }
    });
  };

  return (
    <Scheduler
      view="month"
      customEditor={(scheduler) => (
        <EventEditor scheduler={scheduler} handleSave={handleSave} />
      )}
      onDelete={handleDelete}
      locale={es}
      draggable={false}
    />
  );
};

const EventEditor = ({ scheduler, handleSave }) => {
  const [state, setState] = useState({
    title: scheduler.edited?.title || "",
    start: scheduler.state.start.value,
    end: scheduler.state.end.value,
    type: "",
  });

  const handleChange = (value, name) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const event = scheduler.edited;
    try {
      scheduler.loading(true);
      const addedUpdatedEvent = await handleSave(event, event ? "edit" : "create", state, scheduler);
      scheduler.onConfirm(addedUpdatedEvent, event ? "edit" : "create");
      scheduler.close();
    } catch (error) {
      scheduler.loading(false);
    } finally {
      scheduler.loading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "white", paddingTop: "75px", height: "100%", width: "400px", position: "fixed", top: 0, right: 0 }}>
      <Box sx={{ display: "flex", position: "sticky", top: 0 }}>
        <Box sx={{ width: "90%", paddingLeft: "25px" }}>
          <Typography variant="h6" align="left" color="secondary">
            <strong>{scheduler.edited ? "Editar Evento" : "Crear Evento"}</strong>
          </Typography>
        </Box>
        <Box sx={{ width: "10%", mt: -0.5, mr: -0.5, paddingRight: "10%" }}>
          <IconButton onClick={scheduler.close}>
            <FaTimes />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ paddingInlineStart: 3, paddingBlockEnd: 3 }}>
        <TextField label="Título" value={state.title} onChange={(e) => handleChange(e.target.value, "title")} fullWidth />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <DatePicker label="Fecha" value={dayjs(state.start)} onChange={(value) => handleChange(value, "start")} />
          <TimePicker label="Hora de Inicio" value={dayjs(state.start)} onChange={(value) => handleChange(value, "start")} />
          <TimePicker label="Hora de Fin" value={dayjs(state.end)} onChange={(value) => handleChange(value, "end")} />
        </LocalizationProvider>
        <FormControl fullWidth>
          <InputLabel id="type-label">Tipo de Evento</InputLabel>
          <Select labelId="type-label" id="type" value={state.type} onChange={(e) => handleChange(e.target.value, "type")}>
            <MenuItem value="Pago">Pago</MenuItem>
            <MenuItem value="Entrevista">Entrevista con el empleador</MenuItem>
            <MenuItem value="Cita">Cita con la embajada</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ paddingTop: 3, display: "flex", justifyContent: "end", width: "100%", paddingRight: "12%" }}>
          <Button variant="contained" color="secondary" sx={{ textTransform: "capitalize" }} onClick={handleSubmit}>
            Guardar
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Calendar;

