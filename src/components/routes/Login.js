import React, { Fragment } from "react";
import Container from "@material-ui/core/Container";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import LoginForm from "../login/LoginForm";

const Login = () => {
  return (
    <Fragment>
      <Container maxWidth="lg">
        <Navbar />
        <LoginForm />
        <Footer />
      </Container>
    </Fragment>
  );
};

export default Login;
