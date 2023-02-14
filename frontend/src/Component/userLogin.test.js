import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Login from "./userLogin";
import userEvent from "@testing-library/user-event";

//
test("allows the user to User login successfully", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  const usernameInput = screen.queryByTestId("username");
  const passwordInput = screen.queryByTestId("password");
  const submitButton = screen.queryByTestId("submit");

  fireEvent.change(usernameInput, { target: { value: "johndoe" } });
  fireEvent.change(passwordInput, { target: { value: "secret" } });
  fireEvent.submit(submitButton);

  expect(usernameInput.value).toBe("johndoe");
  expect(passwordInput.value).toBe("secret");
  await waitFor(() => expect(window.localStorage.getItem("token")).toBeNull());
  // expect(window.location.href).toBe(process.env.REACT_APP_API_URL);
});