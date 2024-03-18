import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Register from "./index";
import { Provider } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import store from "../../../store";
jest.mock("axios");

describe("Register component", () => {
  beforeEach(() => {
    axios.post.mockReset();
  });

  test("renders the register form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email ID")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Verify Password")).toBeInTheDocument();
  });

  test("shows an error message when passwords do not match", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
    await userEvent.type(screen.getByLabelText("Password"), "password");
    fireEvent.change(screen.getByLabelText("Verify Password"), {
      target: { value: "mismatch" },
    });
    const submitButton = screen.getByRole("button", { name: /Register/i });
    await userEvent.click(submitButton);
    await screen.findByText("Passwords don't match", { exact: false });
  });

  test("shows an error message when an account with the email already exists", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: "Email already registered",
        },
      },
    });

    fireEvent.change(screen.getByLabelText("Email ID"), {
      target: { value: "existinguser@example.com" },
    });
    const submitButton = screen.getByRole("button", { name: /Register/i });
    fireEvent.click(submitButton);
  });

  it("handles network errors when submitting the form", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
    axios.post.mockRejectedValue(new Error("Network Error"));

    const submitButton = screen.getByRole("button", { name: /Register/i });
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Register/i })
      ).not.toBeDisabled()
    );
  });

  test("submits the form with valid data", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
    process.env.REACT_APP_API = "http://localhost:8080/wallet";

    axios.post.mockResolvedValue({
      data: {
        status: "OK",
      },
    });

    await userEvent.type(screen.getByLabelText("Username"), "username");
    await userEvent.type(
      screen.getByLabelText("Email ID"),
      "username@email.com"
    );

    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.type(screen.getByLabelText("Verify Password"), "password");

    expect(screen.getByText("Already have an account?")).toBeDefined();

    const submitButton = screen.getByRole("button", { name: /Register/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API}/register`,
        {
          username: "username",
          email: "username@email.com",
          password: "password",
          password2: "password",
        }
      );
    });
  });
});
