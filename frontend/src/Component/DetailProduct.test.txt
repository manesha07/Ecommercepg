import { render, renderWithRouter, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import DetailProduct from "./DetailProduct";
import { Home } from "./Home";
import "@testing-library/jest-dom";
import { getByTestId } from "@testing-library/react";

// when user clicks add to cart
// update in the UI
// also call an API but do not await

test("loads and displays Homepage", async () => {
//   render(
//     <Provider store={store}>
//       {/* <BrowserRouter>
//         <Routes>
//           <Route exact path="/products/5" element={<DetailProduct />}></Route>
//         </Routes>
//       </BrowserRouter> */}
//     </Provider>
//   );
render(<Provider store={store}>
  <DetailProduct />
</Provider>)

  expect(screen.getByRole("button", {name: "Buy Now"})).toBeInTheDocument();
});

