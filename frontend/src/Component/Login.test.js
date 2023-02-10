import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Login from "./Login";
import userEvent from "@testing-library/user-event";

test("allows the user to User login successfully", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  const usernameInput = screen.getByTestId("login-user");
  userEvent.type(usernameInput, "admin");
  expect(screen.getByTestId("login-user")).toHaveValue("admin");

  const passwordInput = screen.getByTestId("password");

  userEvent.type(passwordInput, "admin1");
  expect(screen.getByTestId("password")).toHaveValue("admin1");
  fireEvent.click(screen.getByTestId("submit"));

  expect(window.location.pathname).toBe("/");
});
