import { jwtDecode } from "jwt-decode";
import React from "react";
import { useState, useEffect } from "react";

const GoogleSigninBtn = () => {
  const [triggerUseEffect, setUseEffect] = useState(false);

  const handleCallbackResponse = (response) => {
    // alert("Hello", response);
    console.log("Hello", response);

    const decoded = jwtDecode(response.credential);
    console.log(decoded);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    // if (token === []) {
    // google.accounts.id.renderButton(document.getElementById("signin_button"), {
    google.accounts.id.renderButton(document.getElementById("g_id_onload"), {
      theme: "outline",
      size: "large",
    });
    // console.log("Render Button");
    // setUseEffect(true);
    // }
  }, [triggerUseEffect]);

  return (
    <main>
      <div>GoogleSigninBtn</div>
      <div id="g_id_onload" />
    </main>
  );
};

export default GoogleSigninBtn;
