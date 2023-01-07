import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { store, actions } = useContext(Context);

  let navigate = useNavigate;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const form = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const { data } = await axios
      .post("http://localhost:3025/api/v1/user/signin", form)
      .then((response) => {
        if (response.status == 200) {
          Swal.close();
          Swal.fire({
            showConfirmButton: true,
            text: "Usuario logeado exitosamente",
            icon: "success",
            // timer: 2500,
            timerProgressBar: true,
          });
        }
      })
      .catch((err) => {
        Swal.close();
        if (err?.response?.status == 401) {
          localStorage.setItem("authToken", "null");
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

    if (data.status === parseInt("401")) {
      setErrorMessage(data.response);
    } else {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      navigate("/task");
    }
  };
};

export default Login;
