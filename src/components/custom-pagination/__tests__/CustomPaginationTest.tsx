import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomPagination from "../CustomPagination";

describe("custom-pagination", () => {
  it("should load custompagination", async () => {
    const currentPageNumber = 1;
    const finalPageNumber = 3;
    const setNewPageNumber = jest.fn((num: number) => {});

    render(
      <CustomPagination
        currentPageNumber={currentPageNumber}
        finalPageNumber={finalPageNumber}
        setNewPageNumber={setNewPageNumber}
      />
    );

    expect(screen.getByTestId("test-custom-pagination")).toBeInTheDocument();
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("1 of 3")).toBeInTheDocument();
  });

  it("should disable prev button when current page is first page", async () => {
    const currentPageNumber = 1;
    const finalPageNumber = 3;
    const setNewPageNumber = jest.fn((num: number) => {});

    render(
      <CustomPagination
        currentPageNumber={currentPageNumber}
        finalPageNumber={finalPageNumber}
        setNewPageNumber={setNewPageNumber}
      />
    );

    expect(screen.getByText("Prev").hasAttribute("disabled")).toBe(true);
    expect(screen.getByText("Next").hasAttribute("disabled")).toBe(false);
  });

  it("should disables next button when current page is last page", async () => {
    const currentPageNumber = 3;
    const finalPageNumber = 3;
    const setNewPageNumber = jest.fn((num: number) => {});

    render(
      <CustomPagination
        currentPageNumber={currentPageNumber}
        finalPageNumber={finalPageNumber}
        setNewPageNumber={setNewPageNumber}
      />
    );

    expect(screen.getByText("Prev").hasAttribute("disabled")).toBe(false);
    expect(screen.getByText("Next").hasAttribute("disabled")).toBe(true);
  });

  it("should move to previous page when prev page is clicked", async () => {
    const currentPageNumber = 2;
    const finalPageNumber = 3;
    const setNewPageNumber = jest.fn((num: number) => {});

    render(
      <CustomPagination
        currentPageNumber={currentPageNumber}
        finalPageNumber={finalPageNumber}
        setNewPageNumber={setNewPageNumber}
      />
    );

    fireEvent.click(screen.getByText("Prev"));

    expect(setNewPageNumber).toBeCalledWith(1);
  });

  it("should move to next page when next page is clicked", async () => {
    const currentPageNumber = 2;
    const finalPageNumber = 3;
    const setNewPageNumber = jest.fn((num: number) => {});

    render(
      <CustomPagination
        currentPageNumber={currentPageNumber}
        finalPageNumber={finalPageNumber}
        setNewPageNumber={setNewPageNumber}
      />
    );

    fireEvent.click(screen.getByText("Next"));

    expect(setNewPageNumber).toBeCalledWith(3);
  });
});
