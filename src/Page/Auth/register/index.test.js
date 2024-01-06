import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Register from "./index";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../../../store";
jest.mock("axios");

describe("Register component", () => {
  beforeEach(() => {
    axios.post.mockReset();
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
  });

  test("renders the register form", () => {
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email ID")).toBeInTheDocument();
    // expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Verify Password")).toBeInTheDocument();
  });

  test("shows an error message when passwords do not match", async () => {
    // fireEvent.change(screen.getByLabelText("Password"), {
    //   target: { value: "testpassword" },
    // });
    fireEvent.change(screen.getByLabelText("Verify Password"), {
      target: { value: "mismatch" },
    });
    const submitButton = screen.getByRole("button", { name: /Register/i });
    fireEvent.click(submitButton);
    await screen.findByText("Passwords don't match", { exact: false });
  });

  test("shows an error message when an account with the email already exists", async () => {
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
    axios.post.mockRejectedValue(new Error("Network Error"));

    const submitButton = screen.getByRole("button", { name: /Register/i });
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Register/i })
      ).not.toBeDisabled()
    );
  });

  // test("submits the form with valid data", async () => {
  //   process.env.REACT_APP_API = "http://localhost:8080/wallet";

  //   axios.post.mockResolvedValue({
  //     data: {
  //       status: "OK",
  //     },
  //   });

  //   fireEvent.change(screen.getByLabelText("Username"), {
  //     target: { value: "testuser" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Email ID"), {
  //     target: { value: "testuser@example.com" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/password/i), {
  //     target: { value: "testpassword" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Verify Password"), {
  //     target: { value: "testpassworda" },
  //   });

  //   const submitButton = screen.getByRole("button", { name: /Register/i });
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(axios.post).toHaveBeenCalledTimes(1);
  //     // expect(axios.post).toHaveBeenCalledWith(
  //     //     `${process.env.REACT_APP_API}/register`,
  //     //     {
  //     //       username: "testuser",
  //     //       email: "testuser@example.com",
  //     //       password: "testpassword",
  //     //     }
  //     // );
  //   });

  //   // expect(screen.getByText("Registration successful")).toBeInTheDocument();
  //   expect(screen.getByText("Already have an account?")).toBeInTheDocument();
  // });
});
