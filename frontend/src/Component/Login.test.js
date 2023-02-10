import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Login from "./Login";
import * as notify from "../utils/notify.js";
import { ModuleMocker } from "jest-mock";

jest.mock("../utils/notify", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  ToastContainer: () => <div />,
}));

describe("Login", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // it("should render login form and submit successfully", async () => {
  //   const mockSuccessResponse = {
  //     data: {
  //       token: "token",
  //       user: {
  //         name: "user",
  //       },
  //     },
  //   };
  //   // const mockSuccessFetch = jest.fn().mockResolvedValue({
  //   //   json: () => Promise.resolve(mockSuccessResponse),
  //   // });
  //   // window.fetch = mockSuccessFetch;

  //   // const mockResponse = {
  //   //   status: 201,
  //   //   json: () => Promise.resolve({ message: 'Resource created' }),
  //   // };

  //   render(
  //     <Router>
  //       <Login />
  //     </Router>
  //   );

  //   const usernameInput = screen.getByTestId("login-user");
  //   const passwordInput = screen.getByTestId("password");
  //   const submitButton = screen.getByTestId("submit");

  //   fireEvent.change(usernameInput, { target: { value: "user" } });
  //   fireEvent.change(passwordInput, { target: { value: "ram_admin_2" } });
  //   fireEvent.click(submitButton);

  //   const url =  `${process.env.REACT_APP_API_URL}/login`;
  //   const fetch = jest.spyOn(global, 'fetch');
  //   const result = await fetch.mockImplementation((url, options) => {
  //     if (options.method === 'POST') {
  //       return Promise.resolve(mockSuccessResponse);
  //     }
  //   });

  //   // await waitFor(() => {
  //   //   expect(mockSuccessFetch).toHaveBeenCalledWith(
  //   //    `${process.env.REACT_APP_API_URL}/login`,
  //   //     {
  //   //       method: "POST",
  //   //       headers: {
  //   //         "Content-Type": "application/json",
  //   //       },
  //   //       body: JSON.stringify({ username: "user", password: "ram_admin_2" }),
  //   //     }
  //   //   );
  //   // });


  //   // expect(notify.success).toHaveBeenCalledWith("Login");
  //   const expectedUser = {
  //     data: {
  //       token: "token",
  //       user: {
  //         name: "user",
  //       },
  //     },
  //   };
  //   const receivedUser = mockSuccessResponse;
  //   console.log("res",result)
  //   // const receivedUser = JSON.parse(localStorage.getItem("user"));
  //   expect(receivedUser).toEqual(result);

  //   // const expectedToken = mockSuccessResponse.data.token;
  //   // const receivedToken = JSON.parse(localStorage.getItem("token"));
  //   // expect(receivedToken).toBe(expectedToken);
  // });

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
      <Router>
        <Login />
      </Router>
    );

    const usernameInput = screen.getByTestId("login-user");
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByTestId("submit");

    fireEvent.change(usernameInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "ram_admin_2" } });
    fireEvent.click(submitButton);

    const mockResponse = {
      status: 201,
      json: () => Promise.resolve(mockSuccessResponse ),
    };
    
    const fetch = jest.spyOn(global, 'fetch');
    // fetch.mockImplementation((url, options) => {
    //   if (options.method === 'POST') {
    //     return Promise.resolve( mockResponse);
    //   }
    // });
    fetch.mockImplementation(() => Promise.resolve(mockResponse));

    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Test resource' }),
    });
    expect(response.status).toBe(201);
    const json = await response.json();

    console.log("json",json.data)
    expect(json).toEqual({data:{ token: 'token', user: { name: 'user' } }} );


  });

});