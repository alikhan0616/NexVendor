import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignUpPage, ActivationPage } from "./Routes.js";
import { ToastContainer, Bounce, toast } from "react-toastify";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";

function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </BrowserRouter>
  );
}

export default App;
