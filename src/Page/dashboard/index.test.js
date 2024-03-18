import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import Dashboard from "./index";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import configureStore from "redux-mock-store";
import axios from "axios";
import userEvent from "@testing-library/user-event";
jest.mock("axios");

const mockStore = configureStore();
const store = mockStore({
  /* initial state */
});
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const mockPost = jest.fn();
axios.post = mockPost;

describe("Dashboard", () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => '"test-token"');

    axios.post.mockResolvedValue({ data: { user: "testUser" } });
  });

  test("renders Dashboard component", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );
    screen.logTestingPlaygroundURL();

    expect(screen.getByText("WalletApp")).toBeDefined();
    expect(screen.getByText("Menu")).toBeDefined();
    expect(screen.getAllByText("Recharge")).toHaveLength(2);
    expect(screen.getAllByText("Transfer")).toHaveLength(1);
    expect(screen.getAllByText("Statement")).toHaveLength(1);
    expect(screen.getAllByText("Cashbacks")).toHaveLength(1);
    expect(screen.getAllByText("Profile")).toHaveLength(1);
    expect(screen.getAllByText("Logout")).toBeDefined();
  });

  test("renders Dashboard component with right page when the nav button clicked", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText("Transfer"));
    expect(screen.getAllByText("Transfer")).toHaveLength(2);
    expect(screen.getByText("Current Balance")).toBeDefined();

    await userEvent.click(screen.getAllByText("Cashbacks")[0]);
    expect(screen.getByText("Cashbacks")).toBeDefined();
  });

  test("should navigate to login page on API request error", async () => {
    // const mockNavigate = jest.fn();
    // useNavigate.mockReturnValue(mockNavigate);

    // Mock API request failure
    mockPost.mockRejectedValueOnce(new Error("API request failed"));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    // Ensure that the component navigates to the login page
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
  test("click logout", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );
    const logoutIcon = screen.getByTestId("LogoutIcon");
    fireEvent.click(logoutIcon);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: null,
      type: "LOGIN_FAILURE",
    });
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("should dispatch login success action and update user state on successful API request", async () => {
    // Mock successful API response
    mockPost.mockResolvedValueOnce({
      data: {
        email: "test.user@nextuple.com",
        password: "1234",
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    // Ensure that the API request is made
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({
          type: "LOGIN_SUCCESS",
          payload: {
            email: "test.user@nextuple.com",
            password: "1234",
          },
        });
      });
    });
  });
});
