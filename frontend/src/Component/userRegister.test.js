import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Register from "./userRegister";


import React from "react";

import { useNavigate } from "react-router-dom";



describe("Register", () => {
  it("submits the form correctly", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    const fullnameInput = screen.getByTestId("fullname");
    const emailInput = screen.getByTestId("email");
    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    const repasswordInput = screen.getByTestId("repassword");
    const submitButton = screen.getByTestId("submitButton");






    fireEvent.change(fullnameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(usernameInput, { target: { value: "johndoe" } });
    fireEvent.change(passwordInput, { target: { value: "secret" } });
    fireEvent.change(repasswordInput, { target: { value: "secret" } });

    fireEvent.submit(submitButton);
  });
});