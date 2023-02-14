import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Register from "./Register";
import * as notify from "../utils/notify.js";

import React from "react";
// import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from "react-router-dom";
// import { Register } from './Register';

jest.mock("../utils/notify.js", () => ({
  success: jest.fn().mockReturnValue(0),
  error: jest.fn(),
}));

describe("Register", () => {
  it("submits the form correctly", async () => {
    render(
      <Provider store={store}>
        {/* <Login /> */}
        <BrowserRouter>
          <Register />
          {/* <Routes>

              <Route path="/login" element={<Login />} />
            </Routes> */}
        </BrowserRouter>
      </Provider>
    );

    const fullnameInput = screen.getByTestId("fullname");
    const emailInput = screen.getByTestId("email");
    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    const repasswordInput = screen.getByTestId("repassword");
    const submitButton = screen.getByTestId("submit");

    fireEvent.change(fullnameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(usernameInput, { target: { value: "johndoe" } });
    fireEvent.change(passwordInput, { target: { value: "secret" } });
    fireEvent.change(repasswordInput, { target: { value: "secret" } });

    fireEvent.submit(submitButton);

    expect(fullnameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john.doe@example.com");
    expect(usernameInput.value).toBe("johndoe");
    expect(passwordInput.value).toBe("secret");
    expect(repasswordInput.value).toBe("secret");
  });
});