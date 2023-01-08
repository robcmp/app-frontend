import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Lista de Tareas App
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Dar click al boton o usar el menu superior derecho para acceder
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" onClick={handleClick}>
              Acceder
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Home;
