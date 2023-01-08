import React from "react";
import { useEffect, useState, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Context } from "../store/appContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../config";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
});

const Task = () => {
  const [user, setUser] = useState({});
  const [addList, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [taskIdToModify, setTaskIdToModify] = useState("");
  const [errors, setErrors] = useState({});
  const { store } = useContext(Context);
  let navigate = useNavigate();

  const token = localStorage.getItem("token");

  const headers = {
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + token,
  };

  useEffect(() => {
    getUserInfo();
    getTask();
  }, []);

  const getUserInfo = () => {
    axios
      .get(`${apiURL}/user/${store.profileUser}`)
      .then((response) => {
        if (response.status === 200) {
          Swal.close();
          setUser(response.data);
        }
      })
      .catch((err) => {
        Swal.close();
        if (err?.response?.status === 401) {
          localStorage.setItem("token", "null");
        }
        let msg = "";
        if (err.response) {
          msg = err.response.data.errors;
          console.log(msg);
        }
        Swal.fire({
          showConfirmButton: true,
          title: "Error!",
          text: msg,
          icon: "error",
          // timer: 2500,
          timerProgressBar: true,
        });
      });
  };

  const getTask = () => {
    axios
      .get(`${apiURL}/task/${store.profileUser}`)
      .then((response) => {
        setLoading(false);
        setList(response.data);
        Toast.fire({
          icon: "success",
          title: "Tareas obtenidas exitosamente",
        });
      })
      .catch((error) => {
        Swal.fire({
          showConfirmButton: false,
          title: "Error!",
          text: "Ha ocurrido un error al intentar obtener las tareas",
          icon: "error",
          timer: 2500,
          timerProgressBar: true,
        });
        if (error.response.status === 401 || error.response.status === 400) {
          localStorage.setItem("token", "null");
          localStorage.setItem("isAuth", JSON.stringify(false));
          navigate("/login");
        }

        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log(error.message);
        }
      });
  };

  const deleteTask = (key) => {
    axios
      .delete(`${apiURL}/task/${key}`, {
        headers: headers,
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            showConfirmButton: false,
            text: "Tarea eliminada exitosamente",
            icon: "success",
            timer: 2500,
            timerProgressBar: true,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              getTask();
            }
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          showConfirmButton: false,
          title: "Error!",
          text: "Ha ocurrido un error al intentar eliminar la tarea",
          icon: "error",
          timer: 2500,
          timerProgressBar: true,
        });
        if (error.response.status === 401) {
          localStorage.setItem("token", "null");
          localStorage.setItem("isAuth", JSON.stringify(false));
          navigate("/login");
        }

        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log(error.message);
        }
      });
  };

  const handleClickGetTask = () => {
    getTask();
  };

  const handleClickInsertTask = () => {
    setOpen(true);
    setModalTitle("Crear tarea");
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setModalTitle("");
    setTitle("");
    setDescription("");
    setTaskIdToModify("");
  };

  const handleClickSave = () => {
    let updatedErrors = {};

    // Validacion Titulo
    if (title === "") {
      console.log("Error en campo titulo");
      updatedErrors["title"] = "Este campo no puede estar vacío";
      setErrors(updatedErrors);
      return;
    }

    // Validacion Descripcion
    if (description === "") {
      console.log("Error en campo descripcion");
      updatedErrors["description"] = "Este campo no puede estar vacío";
      setErrors(updatedErrors);
      return;
    }

    setErrors(updatedErrors);

    let data = {
      title: title,
      description: description,
      createdBy: store.profileUser,
    };

    //POST
    if (modalTitle.includes("Crear")) {
      axios
        .post(`${apiURL}/task`, data, {
          headers: headers,
        })
        .then((response) => {
          if (response.status === 201) {
            handleClose();
            Swal.fire({
              showConfirmButton: false,
              text: "La tarea fue creada exitosamente",
              icon: "success",
              timer: 2500,
              timerProgressBar: true,
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                getTask();
              }
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.setItem("token", "null");
            localStorage.setItem("isAuth", JSON.stringify(false));
            navigate("/login");
          }
          let msg = "";
          if (error.response) {
            msg = error.response.data.errors;
          }
          Swal.fire({
            showConfirmButton: false,
            title: "Error!",
            text: msg,
            icon: "error",
            timer: 2500,
            timerProgressBar: true,
          });
        });
    }

    //PUT
    if (modalTitle.includes("Modificar")) {
      const { createdBy, ...restData } = data;
      axios
        .put(`${apiURL}/task/${taskIdToModify}`, restData, {
          headers: headers,
        })
        .then((response) => {
          if (response.status === 200) {
            handleClose();
            Swal.fire({
              showConfirmButton: false,
              text: "La tarea fue modificada exitosamente",
              icon: "success",
              timer: 2500,
              timerProgressBar: true,
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                getTask();
              }
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.setItem("token", "null");
            localStorage.setItem("isAuth", JSON.stringify(false));
            navigate("/login");
          }
          let msg = "";
          if (error.response) {
            msg = error.response.data.errors;
          }
          Swal.fire({
            showConfirmButton: false,
            title: "Error!",
            text: msg,
            icon: "error",
            timer: 2500,
            timerProgressBar: true,
          });
        });
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleClickEditTask = (key, values) => {
    setOpen(true);
    setModalTitle("Modificar tarea");
    setTitle(values.title);
    setDescription(values.description);
    setTaskIdToModify(key);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2, fontSize: 20 }}>
          {modalTitle}
        </DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
            <TextField
              id="title-txt"
              label="Título"
              type="text"
              value={title}
              onChange={handleTitleChange}
              error={errors["title"]}
              helperText={errors.title}
            ></TextField>
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <TextField
              id="description-txt"
              label="Descripción"
              multiline
              rows={4}
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              error={errors["description"]}
              helperText={errors.description}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Stack justifyContent="flex-end" spacing={5} direction="row">
            <Button variant="outlined" onClick={handleClickSave}>
              Guardar
            </Button>

            <Button variant="outlined" onClick={handleClose}>
              Cancelar
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h3"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Tareas de <br /> {user.firstname + " " + user.lastname}
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" onClick={handleClickGetTask}>
              Obtener tareas
            </Button>
            <Button variant="contained" onClick={handleClickInsertTask}>
              Crear tareas
            </Button>
          </Stack>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {!isLoading ? (
                addList.map((item) => (
                  <ListItem
                    key={item._id}
                    disableGutters
                    secondaryAction={
                      <>
                        <Tooltip title="Modificar tarea" arrow>
                          <IconButton>
                            <ModeEditIcon
                              onClick={() => {
                                handleClickEditTask(item._id, item);
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar tarea" arrow>
                          <IconButton aria-label="comment">
                            <DeleteIcon
                              onClick={() => {
                                deleteTask(item._id);
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </>
                    }
                  >
                    <ListItemText primary={`${item.title}`} />
                  </ListItem>
                ))
              ) : (
                <ListItem disableGutters>
                  <ListItemText primary={`Loading data...`} />
                </ListItem>
              )}
            </List>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Task;
