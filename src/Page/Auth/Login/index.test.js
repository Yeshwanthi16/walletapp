import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import configureStore from "redux-mock-store";
import Login from "./index";

const mockStore = configureStore([]);
jest.mock("axios");

describe("Login component", () => {
  let store;
  let history;

  beforeEach(() => {
    store = mockStore({
      auth: {},
    });
    history = {
      push: jest.fn(),
    };
    Object.defineProperty(window, "localStorage", {
      value: {
        setItem: jest.fn(() => null),
        getItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  test("renders the email input field", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = screen.getByLabelText("Mail ID");
    expect(emailInput).toBeInTheDocument();
  });

  test("renders the password input field", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  test("renders the submit button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
  });

  test("should submit form and redirect to dashboard on successful login", async () => {
    const token = "some_token";
    process.env.REACT_APP_API = "http://localhost:8080/wallet";

    axios.post.mockResolvedValueOnce({ data: { token } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login history={history} />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/mail id/i);
    const passwordInput = screen.getByLabelText(/password/i, {
      selector: "#component-filled",
    });
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API}/login`,
        { email: "test@test.com", password: "test123" }
      );
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "token",
        JSON.stringify({ token })
      );
    });
  });
});
