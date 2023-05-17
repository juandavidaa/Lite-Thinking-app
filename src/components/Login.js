import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBTabsContent,
  MDBInput,
  MDBTabsPane,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
} from "mdb-react-ui-kit";

import "./Login.css";

import AuthService from "../services/AuthService";

function Login(props) {
  const authService = new AuthService();

  const navigate = useNavigate();
  const [justifyActive, setJustifyActive] = useState("login-tab");
  const [datosLogin, setDatosLogin] = useState({
    email: "",
    password: "",
  });

  const [datosRegister, setDatosRegister] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
  });

  const handleInputChangeLogin = (e) => {
    const { name, value } = e.target;
    const newData = { ...datosLogin, [name]: value };
    setDatosLogin(newData);
  };

  const handleInputChangeRegister = (e) => {
    const { name, value } = e.target;
    const newData = { ...datosRegister, [name]: value };
    setDatosRegister(newData);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    props.close();
    authService
      .login(datosLogin)
      .then((response) => {
        if (response.status !== 200) {
          response = response.json().then((response) => {
            props.alert("danger", response[Object.keys(response)[0]]);
          });
        } else {
          response = response.json().then((response) => {
            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("token_type", response.token_type);
            localStorage.setItem("expires_in", response.expires_in);

            navigate("admin/home");
          });
        }
      })
      .catch((err) => console.error("error: ", err));
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    props.close();
    authService.register(datosRegister).then((response) => {
      if (response.status !== 200) {
        response = response.json().then((response) => {
          props.alert("danger", response[Object.keys(response)[0]]);
        });
      } else {
        response = response.json().then((response) => {
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("token_type", response.token_type);
          localStorage.setItem("expires_in", response.expires_in);

          navigate("admin/home");
        });
      }
    });
  };

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  return (
    <MDBContainer className="main-container">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://static.vecteezy.com/system/resources/previews/001/263/897/original/online-shopping-and-digital-marketing-concept-vector.jpg"
              alt="login form"
              className="rounded-start login-image"
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <span className="h1 fw-bold mb-5 logo">
                  Lite Thinking E-commerce
                </span>
              </div>
              <div>
                <MDBTabs
                  pills
                  justify
                  className="mb-3 d-flex flex-row justify-content-between"
                >
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleJustifyClick("login-tab")}
                      active={justifyActive === "login-tab"}
                    >
                      Login
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleJustifyClick("register-tab")}
                      active={justifyActive === "register-tab"}
                    >
                      Sign up
                    </MDBTabsLink>
                  </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent className="mt-5">
                  <MDBTabsPane show={justifyActive === "register-tab"}>
                    <form onSubmit={handleSubmitRegister}>
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Name"
                        name="name"
                        type="text"
                        size="lg"
                        onChange={(e) => handleInputChangeRegister(e)}
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Email"
                        name="email"
                        type="email"
                        size="lg"
                        onChange={(e) => handleInputChangeRegister(e)}
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Password"
                        name="password"
                        type="password"
                        size="lg"
                        onChange={(e) => handleInputChangeRegister(e)}
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Password confirmation"
                        name="password_confirmation"
                        type="password"
                        size="lg"
                        onChange={(e) => handleInputChangeRegister(e)}
                      />

                      <MDBBtn
                        className="mb-4 w-100"
                        type="submit"
                        color="dark"
                        size="lg"
                      >
                        Sign up
                      </MDBBtn>
                    </form>
                  </MDBTabsPane>
                  <MDBTabsPane show={justifyActive === "login-tab"}>
                    <form onSubmit={handleSubmitLogin}>
                      <MDBInput
                        wrapperClass="mb-3"
                        label="Email"
                        name="email"
                        type="email"
                        size="lg"
                        onChange={(e) => handleInputChangeLogin(e)}
                      />
                      <MDBInput
                        wrapperClass="mb-3"
                        label="Password"
                        name="password"
                        type="password"
                        size="lg"
                        onChange={(e) => handleInputChangeLogin(e)}
                      />

                      <MDBBtn
                        type="submit"
                        className="mb-4 w-100"
                        color="dark"
                        size="lg"
                      >
                        Login
                      </MDBBtn>
                    </form>
                  </MDBTabsPane>
                </MDBTabsContent>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
