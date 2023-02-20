import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import DetailProduct from "./DetailProduct";
import { Home } from "./Home";
import "@testing-library/jest-dom";
import { getByTestId } from "@testing-library/react";
import Products from "./Products";

test("loads and displays Homepage", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Products />
        {/* <BrowserRouter>
        <Routes>
          <Route exact path="/products" element={<Products />} />
          
        </Routes>
      </BrowserRouter> */}
      </BrowserRouter>
    </Provider>
  );

 expect(
   screen.getByText("Products")
 ).toBeInTheDocument();

});
