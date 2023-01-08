import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { apiURL } from "../config";

const Login = (props) => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();
  const saveUserInfo = (profileUser) => {
    localStorage.setItem("token", profileUser);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const form = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    await axios
      .post(`${apiURL}/signin`, form)
      .then((response) => {
        if (response.status == 200) {
          Swal.close();
          actions.setProfile(response.data.id);
          localStorage.setItem("isAuth", JSON.stringify(true));
          saveUserInfo(response.data.token);
          navigate("/task");
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

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Acceder
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Acceder
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2">¿Olvidaste tu contraseña?</Link>
            </Grid>
            <Grid item>
              <Link to="/signup" component={RouterLink} variant="body2">
                {"¿No tienes cuenta? ¡Registrate!"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
