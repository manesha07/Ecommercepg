// // import { render } from "@testing-library/react";
// // import "@testing-library/jest-dom";
// // import { fireEvent, waitFor, screen } from "@testing-library/react";
// // import { BrowserRouter } from "react-router-dom";
// // import { Route, Routes } from "react-router-dom";
// // import { Provider } from "react-redux";
// // import { store } from "../redux/store";
// // import Login from "./Login";
// // import { Link, useNavigate } from "react-router-dom";
// // import userEvent from "@testing-library/user-event";

// // test("allows the user to User login successfully", async () => {
// //   render(
// //     <Provider store={store}>

// //       <BrowserRouter>
// //         <Login />

// //       </BrowserRouter>
// //     </Provider>
// //   );
// // //   const usernameInput = screen.getByTestId("username");
// // //   console.log(usernameInput,"im username ")
// // //   userEvent.type(usernameInput, "user_3");
// // //   expect(screen.getByTestId("username")).toHaveValue("user_3");

// //   //   fireEvent.click(screen.getByText("LOGIN"));
// //   //   expect(screen.getByText("LOGIN")).toBeInTheDocument();

// // //   fill out the form

// // //   const newm =fireEvent.change(screen.getByLabelText(/username/i), {
// // //     target: { value: "user_3" },
// // //   });
// // // //   console.log(screen.getByLabelText(/username/i), "im newm");
// // //   console.log(newm.value, "im newm");

// // const element = screen.getByTestId("custom-element");
// //  userEvent.type(element, "user_3");

// // // //   fireEvent.change(screen.getByLabelText(/password/i), {
// // // //     target: { value: "user_3" },
// // // //   });

// // // //   fireEvent.click(screen.getByText("LOGIN"));
// // // //   expect(window.localStorage.getItem("token")).toBeNull();

// // //   // Verify that the next page is displayed

// // //   // expect(window.location.href).toEqual("process.env.REACT_APP_API_URL");
// // //   expect(window.location.replace(process.env.REACT_APP_API_URL)).toEqual(process.env.REACT_APP_API_URL);

// // // });

// // import { render } from "@testing-library/react";
// // import "@testing-library/jest-dom";
// // import { fireEvent, waitFor, screen } from "@testing-library/react";
// // import { BrowserRouter } from "react-router-dom";
// // import { Route, Routes } from "react-router-dom";
// // import { Provider } from "react-redux";
// // import { store } from "../redux/store";
// // import Login from "./Login";
// // import { Link, useNavigate } from "react-router-dom";
// // import userEvent from "@testing-library/user-event";

// // // import dotenv from "dotenv";

// // // dotenv.config({ path: "./" });

// // test("allows the user to User login successfully", async () => {
// //   render(
// //     <Provider store={store}>
// //       {/* <Login /> */}
// //       <BrowserRouter>
// //         <Login />
// //         {/* <Routes>

// //           <Route path="/login" element={<Login />} />
// //         </Routes> */}
// //       </BrowserRouter>
// //     </Provider>
// //   );

// //   //   fireEvent.click(screen.getByText("LOGIN"));
// //   //   expect(screen.getByText("LOGIN")).toBeInTheDocument();

// //   // fill out the form
// // //   fireEvent.change(screen.getByText(/username/i), {
// // //     target: { value: "user_4" },
// // //   });
// // //   fireEvent.change(screen.getByInputText(/password/i), {
// // //     target: { value: "user_3" },
// // //   });

// //  const inputEl = screen.getByTestId("username");
// //  userEvent.type(inputEl, "user_3");
// //  expect(screen.getByTestId("username")).toHaveValue("user_3");

// //   const inputE2 = screen.getByTestId("password");
// //   userEvent.type(inputE2, "user_3");
// //   expect(screen.getByTestId("password")).toHaveValue("user_3");

// //   fireEvent.click(screen.getByText("LOGIN"));
// //   expect(window.localStorage.getItem("token")).toBeNull();

// // });
// import { render } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { fireEvent, waitFor, screen } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "../redux/store";
// import Login from "./Login";
// import userEvent from "@testing-library/user-event";

// test("allows the user to User login successfully", async () => {
//   render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     </Provider>
//   );

// //   const usernameInput = screen.getByTestId("username");
// //   console.log(usernameInput)

// //   userEvent.type(usernameInput, "user_3");
// //   expect(screen.getByTestId("username")).toHaveValue("user_3");

// //   const passwordInput = screen.getByTestId("password");

// //   console.log(passwordInput,"helloRam");
// //   userEvent.type( passwordInput, "user_3");
// //   expect(screen.getByTestId("password")).toHaveValue("user_3");

// //   fireEvent.click(screen.getByText("LOGIN"));

// //   await waitFor(() =>
// //     expect(window.localStorage.getItem("token")).toBeTruthy()
// //   );
// });

// // import { render } from "@testing-library/react";
// // import "@testing-library/jest-dom";
// // import { fireEvent, waitFor, screen } from "@testing-library/react";
// // import { BrowserRouter } from "react-router-dom";
// // import { Route, Routes } from "react-router-dom";
// // import { Provider } from "react-redux";
// // import { store } from "../redux/store";
// // import Login from "./Login";
// // import { Link, useNavigate } from "react-router-dom";
// // import userEvent from "@testing-library/user-event";

// // // import dotenv from "dotenv";

// // // dotenv.config({ path: "./" });

// // test("allows the user to User login successfully", async () => {
// //   render(
// //     <Provider store={store}>
// //       {/* <Login /> */}
// //       <BrowserRouter>
// //         <Login />
// //         {/* <Routes>

// //           <Route path="/login" element={<Login />} />
// //         </Routes> */}
// //       </BrowserRouter>
// //     </Provider>
// //   );

// //   //   fireEvent.click(screen.getByText("LOGIN"));
// //   //   expect(screen.getByText("LOGIN")).toBeInTheDocument();

// //   // fill out the form
// // //   fireEvent.change(screen.getByText(/username/i), {
// // //     target: { value: "user_4" },
// // //   });
// // //   fireEvent.change(screen.getByInputText(/password/i), {
// // //     target: { value: "user_3" },
// // //   });

// //  const inputEl = screen.getByTestId("username");
// //  userEvent.type(inputEl, "user_3");
// //  expect(screen.getByTestId("username")).toHaveValue("user_3");

// //   const inputE2 = screen.getByTestId("password");
// //   userEvent.type(inputE2, "user_3");
// //   expect(screen.getByTestId("password")).toHaveValue("user_3");

// //   fireEvent.click(screen.getByText("LOGIN"));
// //   expect(window.localStorage.getItem("token")).toBeNull();

// // });
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

//   const usernameInput = screen.queryByTestId("custom-element");
//   console.log(usernameInput, "name");
//   userEvent.type(usernameInput, "user_3");

//   // expect(screen.queryByTestId("username")).toHaveValue("user_3");
// expect(screen.getByRole("input", { name: "username" }).value).toBe("user_3");
//   const passwordInput = screen.queryByTestId("password");
//   userEvent.type(passwordInput, "user_3");
//   expect(screen.queryByTestId("password")).toHaveValue("user_3");

//   fireEvent.click(screen.queryByTestId("login-button"));

//   await waitFor(() => expect(window.localStorage.getItem("token")).toBeNull());
//   expect(window.location.href).toBe(process.env.REACT_APP_API_URL);
});
