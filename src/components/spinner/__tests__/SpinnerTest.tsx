import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Spinner from "../Spinner";

describe("spinner", () => {
  it("should load spinner", async () => {
    render(<Spinner />);

    const loaderHolder = await screen.findByTestId("test-loader-holder");
    const loader = await screen.findByTestId("test-loader");

    expect(loaderHolder).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
  });
});
