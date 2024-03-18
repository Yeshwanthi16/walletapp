import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Cashback } from "./index";

const mockStore = configureStore([]);

describe("Cashback", () => {
  it("displays 'No transactions' message when there are no cashback transactions", () => {
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
        <Cashback />
      </Provider>
    );

    expect(screen.getByText("No Cashbacks")).toBeInTheDocument();
  });

  it("displays only cashback transaction items when there are cashback transactions", () => {
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
                type: "Cashback",
                amount: 5.0,
                date: "2022-04-07T22:16:41.700Z",
                email: "test2@test.com",
              },
              {
                id: "125",
                type: "Cashback",
                amount: 2.0,
                date: "2022-04-06T22:16:41.700Z",
                email: "test3@test.com",
              },
            ],
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <Cashback />
      </Provider>
    );

    expect(screen.queryByText("No Cashbacks")).toBeNull();
    expect(screen.queryByText("Transfer")).toBeNull();
    expect(screen.queryByText("Recharge")).toBeNull();
  });
});
