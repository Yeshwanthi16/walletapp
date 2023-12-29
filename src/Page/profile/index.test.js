import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Profile } from "./index";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Profile component", () => {
  it("should render the user data", () => {
    const userData = {
      user: {
        email: "test@test.com",
        username: "testuser",
        walletBalance: 1000,
      },
    };
    const store = mockStore({ user: userData });
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    expect(
      screen.getByText(new RegExp(`Email ID :\\s*${userData.user.email}`))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`Username :\\s*${userData.user.username}`))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`Wallet balance :\\s*₹${userData.user.walletBalance}`)
      )
    ).toBeInTheDocument();
  });
});
