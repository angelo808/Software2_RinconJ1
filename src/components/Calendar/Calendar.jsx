import { Scheduler } from "@aldabil/react-scheduler";
import es from "date-fns/locale/es";
import "dayjs/locale/es";
import dayjs from "dayjs";

import {
  Button,
  Typography,
  Box,
  ThemeProvider,
  CircularProgress,
  DialogActions,
  TextField,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import { Fragment, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { axiosBase } from "../../axios/axiosBase";

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

const generateDate = (fecha) => {
  //hacer una validacion que existe un fechas y hora no nulos
  let newDateTime = fecha.$d;
  let year = fecha.$d.getFullYear().toString();
  let month = (fecha.$d.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to the month because getMonth() returns 0-based index
  let day = fecha.$d.getDate().toString().padStart(2, "0");

  return year + "-" + month + "-" + day;
};

const generateHours = (fecha) => {
  //hacer una validacion que existe un fechas y hora no nulos
  let newDateTime = fecha.$d;
  let hours = fecha.$d.getHours().toString().padStart(2, "0");
  let minutes = fecha.$d.getMinutes().toString().padStart(2, "0");

  return hours + ":" + minutes;
};

const generateDate2 = (fecha) => {
  //hacer una validacion que existe un fechas y hora no nulos
  let newDateTime = fecha.$d;
  let year = fecha.$d.getFullYear().toString();
  let month = (fecha.$d.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to the month because getMonth() returns 0-based index
  let day = fecha.$d.getDate().toString().padStart(2, "0");

  return year + "-" + month + "-" + day;
};

const generateHours2 = (fecha) => {
  //hacer una validacion que existe un fechas y hora no nulos
  //let newDateTime = fecha.$d;
  let hours = fecha.$d.getHours();
  hours = hours.toString().padStart(2, "0");
  let minutes = fecha.$d.getMinutes().toString().padStart(2, "0");

  return hours + ":" + minutes;
};

const handleDelete = async (deleteId) => {
  let scheduler = Scheduler;
  return await new Promise((res) => {
    axiosBase()
      .delete(`/events/${deleteId}/`)
      .then((response) => {
        toast.success("El horario fue eliminado exitosamente");
        res(deleteId);
        scheduler.close();
        scheduler.loading(false);
      })
      .catch((err) => {
        toast.error("Ha ocurrido un error al eliminar el horario");
        console.log(err);
      });
  });
};

const PanelRegistro = ({ scheduler }) => {
  const event = scheduler.edited;
  const libre = event ? event?.libre : true;
  const [fecha, setFecha] = useState(dayjs(scheduler.state.start.value));
  const [horaIni, setHoraIni] = useState(dayjs(scheduler.state.start.value));
  const [horaFin, setHoraFin] = useState(dayjs(scheduler.state.end.value));

  const [type, setType] = useState("");

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  //const [titulo, setTitulo] = useState<any>(event?.title || "");
  const [error, setError] = useState("");

  useEffect(() => {}, [fecha, horaIni, horaFin]);

  const [state, setState] = useState({
    title: event?.title || "",
    enlace: event?.enlace || "",
  });

  const handleChange = (value, name) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSaveAvailability = async (
    event,
    action,
    datosEvento,
    scheduler
  ) => {
    const userId = JSON.parse(localStorage.getItem("user") || "")?.id;
    console.log("userId", userId);
    const datosEvento2 = {
      nombre: datosEvento.nombre,
      dia: generateDate(datosEvento.dia),
      hora_inicio: generateHours(datosEvento.hora_inicio),
      hora_fin: generateHours(datosEvento.hora_fin),
      tipo: datosEvento.tipo,
      descripcion: "",
      userId: userId || 0,
    };

    return await new Promise((res) => {
      if (action == "create") {
        axiosBase()
          .post("/events/", datosEvento2)
          .then((response) => {
            toast.success("El horario fue registrado exitosamente");
            const data = response.data;
            res({
              event_id: data.id_disponibilidad,
              title: data["nombre"],
              start: new Date(data["dia"] + "T" + data["hora_inicio"]),
              end: new Date(data["dia"] + "T" + data["hora_fin"]),
              enlace: data["enlace"],
              color: colorConfigs.freeSchedule,
              libre: data["libre"],
            });
          })
          .catch((err) => {
            scheduler.loading(false);
            scheduler.close();
            //toast.error('Hubo un error al registrar el horario');
            toast.error(err.response.data);
          });
      } else if (action == "edit") {
        axiosBase()
          .patch(`/events/${event?.event_id}/`, datosEvento2)
          .then((response) => {
            toast.success("El horario fue editado exitosamente");
            const data = response.data;
            res({
              event_id: data.id_disponibilidad,
              title: data["nombre"],
              start: new Date(data["dia"] + "T" + data["hora_inicio"]),
              end: new Date(data["dia"] + "T" + data["hora_fin"]),
              enlace: data["enlace"],
              color: !data.libre
                ? colorConfigs.busySchedule
                : colorConfigs.freeSchedule,
              libre: data["libre"],
            });
          })
          .catch((err) => {
            scheduler.loading(false);
            scheduler.close();
            //toast.error('Hubo un error al editar el horario');
            toast.error(err.response.data);
          });
      }
    });
  };

  const handleSubmit = async () => {
    //setFecha(dayjs(scheduler.state.start.value))
    //setHoraIni(dayjs(scheduler.state.start.value))
    //setHoraFin(dayjs(scheduler.state.end.value))
    let timeAct = new Date();
    let timeInicio = new Date(
      `${generateDate2(fecha)}T${generateHours2(horaIni)}`
    );
    let timeFin = new Date(
      `${generateDate2(fecha)}T${generateHours2(horaFin)}`
    );

    console.log("timeAct" + timeAct);
    console.log("timeInicio" + timeInicio);
    console.log("timeFin" + timeFin);

    // Your own validation
    if (state.title.length < 3) {
      return setError("Minimo 3 caracteres");
    }

    if (horaFin <= horaIni) {
      toast.warn("La hora de inicio no puede ser mayor a la de finalización");
      setError("");
      return null;
    }

    if (timeInicio <= timeAct) {
      toast.warn("No se puede registrar una disponibilidad en el pasado");
      setError("");
      return null;
    }

    try {
      scheduler.loading(true);
      const datosEvento = {
        nombre: state.title,
        dia: fecha,
        hora_inicio: horaIni,
        hora_fin: horaFin,
        tipo: type,
      };

      const added_updated_event = await Promise.all([
        handleSaveAvailability(
          event,
          event ? "edit" : "create",
          datosEvento,
          scheduler
        ),
      ]);

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");

      scheduler.close();
    } catch (error) {
      scheduler.loading(false);
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

      <Grid
        container
        sx={{
          border: 0,
          marginBottom: 2,
          paddingInlineStart: 3,
          paddingBlockEnd: 3,
          borderRadius: 0,
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            paddingRight: 1,
            paddingTop: 2,
            border: 0,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ mb: 1, fontWeight: 600 }}>Título *</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            paddingRight: 1,
            paddingTop: 0,
            border: 0,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <TextField
            value={state.title}
            onChange={(e) => handleChange(e.target.value, "title")}
            error={!!error}
            helperText={error}
            sx={{ width: "90%" }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            paddingRight: 1,
            paddingTop: 2,
            border: 0,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ mb: 1, fontWeight: 600 }}>Fecha *</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            paddingRight: 1,
            paddingTop: 0,
            border: 0,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DatePicker
              sx={{ width: "90%" }}
              value={fecha}
              onChange={(valor) => setFecha(valor)}
            />
          </LocalizationProvider>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            paddingRight: 1,
            paddingTop: 2,
            border: 0,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ mb: 1, fontWeight: 600 }}>
            Hora de Inicio *
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            paddingRight: 1,
            paddingTop: 0,
            border: 0,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <TimePicker
              sx={{ width: "90%" }}
              value={horaIni}
              onChange={(valor) => setHoraIni(valor)}
            />
          </LocalizationProvider>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            paddingRight: 1,
            paddingTop: 2,
            border: 0,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ mb: 1, fontWeight: 600 }}>Hora de Fin *</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            paddingRight: 1,
            paddingTop: 0,
            border: 0,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <TimePicker
              sx={{ width: "90%" }}
              value={horaFin}
              onChange={(valor) => setHoraFin(valor)}
            />
          </LocalizationProvider>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            paddingRight: 1,
            paddingTop: 2,
            border: 0,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ mb: 1, fontWeight: 600 }}>
            Tipo de Evento
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            paddingRight: 1,
            paddingTop: 0,
            border: 0,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <FormControl fullWidth variant="standard">
            <Select
              labelId="payment-select-label"
              id="payment-select"
              value={type}
              label="Options"
              onChange={handleTypeChange}
            >
              <MenuItem value="Pago">Pago</MenuItem>
              <MenuItem value="Entrevista">
                Entrevista con el empleador
              </MenuItem>
              <MenuItem value="Cita">Cita con el embajada</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Box
          sx={{
            paddingTop: 3,
            display: "flex",
            justifyContent: "end",
            width: "100%",
            paddingRight: "12%",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              textTransform: "capitalize",
            }}
            onClick={handleSubmit}
          >
            Guardar
          </Button>
        </Box>
      </Grid>
    </div>
  );
};

export const Calendar = () => {
  return (
    <>
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
          cellRenderer: ({ height, start, onClick, ...props }) => {
            // Fake some condition up
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
                  if (disabled) {
                    return <></>;
                  }
                  onClick();
                }}
                disableRipple={disabled}
                // disabled={disabled}
                {...restProps}
              ></Button>
            );
          },
        }}
      />
      <ToastContainer />
    </>
  );
};
