import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import AddProduct from "./AddProduct";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  waitForElementToBeInTheDocument,
} from "react-router-dom";
import { store } from "../redux/store";
import * as notify from "../utils/notify";
jest.mock("../utils/notify");

jest.mock("axios");

describe("AddProduct", () => {
  test("submits the form and shows success message", async () => {
    axios.post.mockResolvedValueOnce({
      data: { details: null },
    });
    render(
      //This line renders the AddProduct component within a Provider and BrowserRouter.
      <Provider store={store}>
        <BrowserRouter>
          <AddProduct />
        </BrowserRouter>
      </Provider>
    );

    const fileInput = screen.getByTestId("productImage");

    const productNameInput = screen.getByTestId("productName");
    const productDescriptionInput = screen.getByTestId("productDiscription");
    const productPriceInput = screen.getByTestId("productPrice");
    const productCategoryInput = screen.getByTestId("productCategory");
    const productStockInput = screen.getByTestId("productStock");
    const productSubmitButton = screen.getByTestId("productSubmit");

    const productName = "Test Product";
    const productDescription = "This is a test product.";
    const productPrice = "100";
    const productCategory = "Test";
    const productStock = "10";
    const testImageFile = new File(["hello"], "hello.png", {
      type: "image/png",
    });

    fireEvent.change(productNameInput, { target: { value: productName } });
    fireEvent.change(productDescriptionInput, {
      target: { value: productDescription },
    });
    fireEvent.change(productPriceInput, { target: { value: productPrice } });
    fireEvent.change(productCategoryInput, {
      target: { value: productCategory },
    });

    fireEvent.change(productStockInput, { target: { value: productStock } });

    fireEvent.click(productSubmitButton);
    //  await waitFor(() => {
    //    expect(screen.getByText("Succesfully Added")).toBeInTheDocument();
    //  });

    // await waitForElementToBeInTheDocument(
    //   screen.getByText("Succesfully Added")
    // );
    // expect(screen.getByText("Succesfully Added")).toBeInTheDocument();

    console.log(notify.success, "im success ");
    //These lines use the fireEvent object from the React Testing Library to simulate user input on the form elements.
    await waitFor(() => {
      console.log(notify.success, "im success 2");
      expect(notify.success).toHaveBeenCalledWith("Added");
    });

    expect(productNameInput.value).toBe("Test Product");
    expect(productCategoryInput.value).toBe("Test");
    expect(productDescriptionInput.value).toBe("This is a test product.");
    expect(productPriceInput.value).toBe("100");

    expect(productStockInput.value).toBe("10");

    // Make sure test is clean
    expect(fileInput.files.length).toBe(0);
    await userEvent.upload(fileInput, testImageFile);

    expect(fileInput.files.length).toBe(1);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/products`,
        expect.any(FormData),
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //want Successfully Added message in this line
    });

    //  const mockSuccess = jest.spyOn(notify, "success");
    //     mockSuccess.mockImplementation(() => {});
    //        await waitFor(() =>
    //          expect(mockSuccess).toHaveBeenCalledWith("Added", {
    //            position: expect.anything(),
    //          })
    //        );
  });
});
