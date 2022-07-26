import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../SearchBar";

describe("searchbar", () => {
  it("should load searchbar", async () => {
    const placeHolderText = "Test Placeholder";
    const onChangeMock = jest.fn((val: string) => {});
    const tabIndex = 121;
    const value = "search";

    render(
      <SearchBar
        placeHolder={placeHolderText}
        onChange={onChangeMock}
        value={value}
        tabIndex={tabIndex}
      />
    );

    const input = await screen.queryByPlaceholderText(placeHolderText);

    expect(input).toBeInTheDocument();
    expect(input?.tabIndex).toBe(tabIndex);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    expect(onChangeMock).not.toBeCalled();
  });

  it("should trigger onChange event when value changes in searchbar", async () => {
    const placeHolderText = "Test Placeholder";
    const onChangeMock = jest.fn((val: string) => {});
    const tabIndex = 121;
    const value = "search";
    const newValue = "Chukk Norris";

    render(
      <SearchBar
        placeHolder={placeHolderText}
        onChange={onChangeMock}
        value={value}
        tabIndex={tabIndex}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(placeHolderText), {
      target: {
        value: newValue,
      },
    });

    expect(onChangeMock).toBeCalledWith(newValue);
  });

  it("should show close button when value exists in searchbar", async () => {
    const placeHolderText = "Test Placeholder";
    const onChangeMock = jest.fn((val: string) => {});
    const tabIndex = 121;
    const value = "Chukk Norris";

    render(
      <SearchBar
        placeHolder={placeHolderText}
        onChange={onChangeMock}
        value={value}
        tabIndex={tabIndex}
      />
    );

    const closeButton = await screen.findByTestId("test-button");

    expect(closeButton).toBeInTheDocument();
  });

  it("should not show close button when value does not exists in searchbar", async () => {
    const placeHolderText = "Test Placeholder";
    const onChangeMock = jest.fn((val: string) => {});
    const tabIndex = 121;
    const value = "";

    render(
      <SearchBar
        placeHolder={placeHolderText}
        onChange={onChangeMock}
        value={value}
        tabIndex={tabIndex}
      />
    );

    const closeButton = await screen.queryByTestId("test-button");

    expect(closeButton).not.toBeInTheDocument();
  });
});
