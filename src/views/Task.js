import React from "react";
import { useEffect, useState, useContext } from "react";
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

const Task = () => {
  const [user, setUser] = useState({});
  const [addList, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { store } = useContext(Context);

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
        console.log(response.data);
        setLoading(false);
        setList(response.data);
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
          localStorage.setItem("authToken", "null");
        }

        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log(error.message);
        }
      });
  };

  return (
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
          Lista de Tareas de {user.firstname + " " + user.lastname}
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained">Obtener tareas</Button>
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
              addList.map((item, index) => (
                <ListItem
                  key={index}
                  disableGutters
                  secondaryAction={
                    <IconButton aria-label="comment">
                      <DeleteIcon />
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
  );
};

export default Task;
