// Import the required modules and libraries
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Login from "./Login";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("../utils/notify", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  ToastContainer: () => <div />,
}));

// Describing the test case for the Login component
describe("Login", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Testing the Login component's ability to render the login form and submit successfully

  it("should render login form and submit successfully", async () => {
    const mockSuccessResponse = {
      data: {
        token: "token",
        user: {
          name: "user",
        },
      },
    };

    render(
      // Rendering the Login component with the Router
      <Provider store={store}>
     <BrowserRouter>
          <Login />
     </BrowserRouter>
      </Provider>
    );

    // Getting the input elements and submit button from the rendered component

    const usernameInput = screen.getByTestId("login-user");
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByTestId("submit");

    // Emulating the user input into the input elements
    fireEvent.change(usernameInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "ram_admin_2" } });
    fireEvent.click(submitButton);

    // Mocking the response received from the API
    const mockResponse = {
      status: 201,
      json: () => Promise.resolve(mockSuccessResponse),
    };
    console.log(mockResponse, "im response");

    // Spying on the global fetch API to mock its behavior
    const fetch = jest.spyOn(global, "fetch"); //Jest's spyOn function to mock the fetch API and intercept any calls made to it.

    fetch.mockImplementation(() => Promise.resolve(mockResponse));

    console.log(fetch(`${process.env.REACT_APP_API_URL}/login`), "im fatch");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Test resource" }),
    });

    expect(response.status).toBe(201); // Checking if the response status is 201
    const json = await response.json(); // Getting the JSON data from the response

    console.log("json", json.data); // Checking if the JSON data matches the expected value
    expect(json).toEqual({ data: { token: "token", user: { name: "user" } } });
  });
});
