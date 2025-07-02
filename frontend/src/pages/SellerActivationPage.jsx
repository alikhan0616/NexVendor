import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../server";
import axios from "axios";

export default function SellerActivationPage() {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
    setLoading(true);

    if (activation_token) {
      const activationEmail = async () => {
        try {
          const response = await axios.post(`${server}/shop/activation`, {
            activation_token,
          });

          setMessage("Your seller account has been created successfully!");
          setLoading(false);

          // Redirect to login page after 3 seconds
          setTimeout(() => {
            navigate("/shop-login");
          }, 3000);
        } catch (err) {
          setError(true);
          setLoading(false);

          if (err.response?.data?.message) {
            setMessage(err.response.data.message);
          } else {
            setMessage("Your token is expired or invalid!");
          }
        }
      };
      activationEmail();
    } else {
      setError(true);
      setLoading(false);
      setMessage("No activation token found!");
    }
  }, [activation_token, navigate]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Seller Account Activation</h1>

        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
            <p>Activating your seller account...</p>
          </div>
        ) : (
          <div>
            {error ? (
              <div className="text-red-600">
                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-lg font-semibold">{message}</p>
                <button
                  onClick={() => navigate("/shop-create")}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="text-green-600">
                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-lg font-semibold">{message}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Redirecting to login page...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
