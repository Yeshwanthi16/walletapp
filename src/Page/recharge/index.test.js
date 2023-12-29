import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import configureStore from "redux-mock-store";
import { Recharge } from "./index";
import React from "react";

const mockStore = configureStore([]);

jest.mock("axios");

describe("Recharge component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {},
    });
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "some_token"),
      },
      writable: true,
    });
  });

  test("renders the amount input field", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Recharge />
        </MemoryRouter>
      </Provider>
    );
    const amountInput = screen.getByLabelText("₹ Amount");
    expect(amountInput).toBeInTheDocument();
  });

  test("renders the current balance component", () => {
    const user = {
      user: {
        walletBalance: 100,
      },
    };
    store = mockStore(user);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Recharge />
        </MemoryRouter>
      </Provider>
    );
    const currentBalance = screen.getByTitle("balance-field");
    expect(currentBalance).toBeInTheDocument();
    expect(currentBalance).toHaveTextContent(`Current Balance : ₹`);
  });

  test("displays snackbar when recharge is successful", async () => {
    const payload = {
      email: "test@test.com",
      amount: 50.0,
    };
    const token = "some_token";
    process.env.REACT_APP_API = "http://localhost:8080/wallet";

    axios.post.mockResolvedValueOnce({
      data: { message: "Recharge successful" },
    });
    axios.post.mockResolvedValueOnce({
      data: { user: { walletBalance: 150 } },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Recharge />
        </MemoryRouter>
      </Provider>
    );

    const amountInput = screen.getByLabelText("₹ Amount");
    const rechargeButton = screen.getByTitle("submit-button");

    fireEvent.change(amountInput, { target: { value: 50 } });
    fireEvent.click(rechargeButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(2);
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API}/recharge`,
        {
          amount: "50",
          email: "test@test.com",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API}/data`,
        {
          token: token,
        }
      );

      // Dispatch an action to update the user state in the store
      store.dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: { walletBalance: 150 } },
      });

      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText("Recharge successful")).toBeInTheDocument();
    });
  });

  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Recharge />
        </MemoryRouter>
      </Provider>
    );
  });

  test("displays error message and navigates to back when recharge fails", async () => {
    const payload = {
      email: "test@test.com",
      amount: 50.0,
    };
    const token = "some_token";
    process.env.REACT_APP_API = "http://localhost:8080/wallet";

    axios.post.mockRejectedValueOnce(new Error("Recharge failed"));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Recharge />
        </MemoryRouter>
      </Provider>
    );

    const amountInput = screen.getByLabelText("₹ Amount");
    const rechargeButton = screen.getByTitle("submit-button");

    fireEvent.change(amountInput, { target: { value: 50 } });
    fireEvent.click(rechargeButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API}/recharge`,
        {
          amount: "50",
          email: "test@test.com",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(window.location.pathname).toBe("/");
    });
  });
});
