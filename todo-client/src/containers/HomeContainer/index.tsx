import React, { useState } from "react";
import HomeComponent from "../../components/HomeComponent/index";
import { RouterProps } from "react-router";

const HomeContainer = ({ history }: RouterProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function login(e: any) {
    e.preventDefault();
    if (email === "") {
      setError("Add your email!");
    } else {
      history.push({ pathname: "/dashboard", state: { email } });
    }
  }

  return <HomeComponent login={login} setEmail={setEmail} error={error} />;
};

export default HomeContainer;
