import React from "react";
import { useEffect, useState, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Context } from "../store/appContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
  const { store } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
    getTask();
  }, []);

  const getUserInfo = () => {
    axios
      .get(`http://localhost:3025/api/v1/user/${store.profileUser}`)
      .then((response) => {
        if (response.status == 200) {
          Swal.close();
          setUser(response.data);
        }
      })
      .catch((err) => {
        Swal.close();
        if (err?.response?.status == 401) {
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
      .get(`http://localhost:3025/api/v1/task/${store.profileUser}`)
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
        if (error.response.status == 401 || error.response.status == 400) {
          localStorage.setItem("token", "null");
          localStorage.setItem("isAuth", JSON.stringify(false));
          navigate("/login");
        }

        if (error.response) {
          console.log("error.response.status", error.response.status);
          console.log(error.response.data.message);
        } else {
          console.log(error.message);
        }
      });
  };

  const deleteTask = (key) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    console.log("key", key);
    console.log("store", store.profileUser);
    axios
      .delete(`http://localhost:3025/api/v1/task/${key}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status == 200) {
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
          text: "Ha ocurrido un error al intentar obtener las tareas",
          icon: "error",
          timer: 2500,
          timerProgressBar: true,
        });
        if (error.response.status == 401) {
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
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSave = (value) => {};

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2, fontSize: 20 }}>Crear tarea</DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
            <TextField id="title-txt" label="Título" type="text"></TextField>
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <TextareaAutosize
              id="description-txt"
              aria-label="description"
              minRows={3}
              placeholder="Descripción"
              style={{ width: 552 }}
              type="text"
            />
            {/* <TextField label="Descripción"></TextField> */}
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
                      <IconButton aria-label="comment">
                        <DeleteIcon
                          onClick={() => {
                            deleteTask(item._id);
                          }}
                        />
                      </IconButton>
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
