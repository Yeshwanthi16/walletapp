import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { Transfer } from "./index";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../../store";
import { REACT_APP_API } from "../../constants";

jest.mock("axios");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Transfer component", () => {
  beforeEach(() => {
    localStorage.setItem("token", "dummy_token");
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should render Transfer component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Transfer />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Transfer")).toBeInTheDocument();
  });

  it("should show error message when submitting with empty fields", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Transfer />
        </MemoryRouter>
      </Provider>
    );
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid recipient email and amount")
      ).toBeInTheDocument();
    });
  });

  it("should show error message when transferring to self", async () => {
    const data = {
      email: "dummy@example.com",
      user: {
        walletBalance: 100,
      },
    };
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue(data);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Transfer />
        </MemoryRouter>
      </Provider>
    );
    const toInput = screen.getByLabelText("Receiver's email");
    const amountInput = screen.getByLabelText("₹ Amount");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(toInput, { target: { value: "dummy@example.com" } });
    fireEvent.change(amountInput, { target: { value: "50" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Can't transfer to self")).toBeInTheDocument();
    });
  });

  it("should show success message when transfer is successful", async () => {
    const data = {
      email: "dummy@example.com",
      user: {
        walletBalance: 100,
      },
    };
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue(data);

    const mockPost = jest.spyOn(axios, "post");
    mockPost.mockResolvedValue({
      data: {
        message: "Transfer successful",
        user: {
          walletBalance: 50,
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Transfer />
        </MemoryRouter>
      </Provider>
    );
    const toInput = screen.getByLabelText("Receiver's email");
    const amountInput = screen.getByLabelText("₹ Amount");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(toInput, { target: { value: "other@example.com" } });
    fireEvent.change(amountInput, { target: { value: "50" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith(
        `${REACT_APP_API}/transfer`,
        {
          fromEmail: "dummy@example.com",
          toEmail: "other@example.com",
          amount: "50",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer dummy_token`,
          },
        }
      );
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText("Transfer successful")).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(toInput).toHaveValue("");
    });
  });
});
