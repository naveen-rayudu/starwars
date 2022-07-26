import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import _ from "lodash";
import { getPeopleDetails } from "../services/PeopleService";
import { act } from "react-dom/test-utils";

jest.mock("../services/PeopleService", () => {
  const originalModule = jest.requireActual("../services/PeopleService");

  return {
    __esModule: true,
    ...originalModule,
    getPeopleDetails: jest.fn(),
  };
});

jest.mock("lodash", () => ({
  ...jest.requireActual("lodash"),
  debounce: (fn: any) => fn,
}));

describe("app", () => {
  it("should load app", async () => {
    render(<App />);

    expect(screen.getByPlaceholderText("Search By Name")).toBeInTheDocument();
  });

  it("should calls service when search name changes", async () => {
    render(<App />);

    expect(getPeopleDetails).toBeCalledWith(
      "",
      1,
      expect.any(Function),
      expect.any(Function)
    );

    fireEvent.change(screen.getByTestId("test-search-bar"), {
      target: {
        value: "Chuck",
      },
    });

    expect(getPeopleDetails).toBeCalledWith(
      "Chuck",
      1,
      expect.any(Function),
      expect.any(Function)
    );
  });

  it("should show spinner when data is getting loaded", async () => {
    const { debug } = render(<App />);

    expect(getPeopleDetails).toBeCalledWith(
      "",
      1,
      expect.any(Function),
      expect.any(Function)
    );

    expect(screen.getByTestId("test-loader-holder")).toBeInTheDocument();
  });

  it("should hide spinner when data is loaded", async () => {
    render(<App />);

    expect(getPeopleDetails).toBeCalledWith(
      "",
      1,
      expect.any(Function),
      expect.any(Function)
    );

    expect(screen.getByTestId("test-loader-holder")).toBeInTheDocument();

    act(() => {
      (getPeopleDetails as jest.Mock<any, any>).mock.calls[0][2]();
    });

    expect(screen.queryByText("test-loader-holder")).not.toBeInTheDocument();
  });

  it("should hide spinner and shows alert when error occured in loading data", async () => {
    window.alert = jest.fn();
    render(<App />);

    expect(getPeopleDetails).toBeCalledWith(
      "",
      1,
      expect.any(Function),
      expect.any(Function)
    );

    expect(screen.getByTestId("test-loader-holder")).toBeInTheDocument();

    act(() => {
      (getPeopleDetails as jest.Mock<any, any>).mock.calls[0][3]();
    });

    expect(screen.queryByText("test-loader-holder")).not.toBeInTheDocument();
    expect(window.alert).toBeCalledWith("Error occured while fetching results");
  });
});
