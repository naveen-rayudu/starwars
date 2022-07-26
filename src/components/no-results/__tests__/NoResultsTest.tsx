import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NoResults from "../NoResults";

describe("noresults", () => {
  test("loads noresults", async () => {
    const message = "No peoples found";

    render(<NoResults message={message} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
