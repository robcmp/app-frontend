import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { apiURL } from "../config";
import axios from "axios";
import Swal from "sweetalert2";
import FormControl from "@mui/material/FormControl";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const handleSubmit = () => {
    let updatedErrors = {};

    //Validacion Nombre
    if (firstName === "") {
      console.log("Error en campo nombre");
      updatedErrors["firstName"] = "Este campo no puede estar vacío";
      setErrors(updatedErrors);
      return;
    }

    // Validacion Apellido
    if (lastName === "") {
      console.log("Error en campo apellido");
      updatedErrors["lastName"] = "Este campo no puede estar vacío";
      setErrors(updatedErrors);
      return;
    }

    // Validacion Correo
    if (email === "") {
      console.log("Error en campo correo");
      updatedErrors["email"] = "Este campo no puede estar vacío";
      setErrors(updatedErrors);
      return;
    }

    // Validacion Correo
    if (password === "") {
      console.log("Error en campo contraseña");
      updatedErrors["password"] = "Este campo no puede estar vacío";
      setErrors(updatedErrors);
      return;
    }

    setErrors(updatedErrors);

    let data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    };

    axios
      .post(`${apiURL}/signup`, data)
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            showConfirmButton: false,
            text: "El usuario fue creado exitosamente",
            icon: "success",
            timer: 2500,
            timerProgressBar: true,
          });
          clearData();
        }

        if (response.status === 204) {
          Swal.fire({
            showConfirmButton: false,
            text: "El correo ya fue usado",
            icon: "error",
            timer: 2500,
            timerProgressBar: true,
          });
          clearData();
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.setItem("token", "null");
          localStorage.setItem("isAuth", JSON.stringify(false));
          clearData();
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
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const clearData = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <TextField
                    name="firstName"
                    fullWidth
                    autoFocus
                    type="text"
                    label="Nombre"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    error={errors["firstName"]}
                    helperText={errors.firstName}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <TextField
                    fullWidth
                    type="text"
                    label="Apellido"
                    name="lastName"
                    value={lastName}
                    autoComplete="family-name"
                    onChange={handleLastNameChange}
                    error={errors["lastName"]}
                    helperText={errors.lastName}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={errors["email"]}
                    helperText={errors.email}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                    error={errors["password"]}
                    helperText={errors.password}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" component={RouterLink} variant="body2">
                  ¿Tienes cuenta? Ingresa
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
