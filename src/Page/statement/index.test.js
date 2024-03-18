import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Statement } from "./index";

const mockStore = configureStore([]);

describe("Statement", () => {
  it("displays 'No transactions' message when there are no transactions", () => {
    const store = mockStore({
      user: {
        transactions: [
          {
            transaction: [],
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <Statement />
      </Provider>
    );

    expect(screen.getByText("No transactions")).toBeDefined();
  });

  it("displays transaction items when there are transactions", () => {
    const store = mockStore({
      user: {
        transactions: [
          {
            transaction: [
              {
                id: "123",
                type: "Transfer",
                amount: 50.0,
                date: "2022-04-08T22:16:41.700Z",
                email: "test1@test.com",
              },
              {
                id: "124",
                type: "Recharge",
                amount: 100.0,
                date: "2022-04-07T22:16:41.700Z",
                email: "test2@test.com",
              },
            ],
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <Statement />
      </Provider>
    );

    expect(screen.getByText("Transfer")).toBeInTheDocument();
    expect(screen.getByText("Recharge")).toBeInTheDocument();
  });
});
