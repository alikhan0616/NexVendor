import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import axios from "axios";

export default function ActivationPage() {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    if (activation_token) {
      const activationEmail = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      activationEmail();
    }
  }, [activation_token]);
  return (
    <div className="w-[100%] h-screen flex justify-center items-center">
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
}
