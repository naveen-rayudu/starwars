import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PeopleDetail from "../PeopleDetail";
import { PeopleDetailModel } from "../../../models/PeopleDetailModel";

describe("peopledetail", () => {
  it("should load peopledetail", async () => {
    const pupilDetail: PeopleDetailModel = {
      address: "Tatooine",
      firstName: "Chuck",
      lastName: "Norris",
      fullName: "Chuck, Norris",
    };

    render(<PeopleDetail people={pupilDetail} />);

    expect(screen.getByText("Chuck, Norris")).toBeInTheDocument();
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    expect(screen.getByAltText("Chuck, Norris")).toBeInTheDocument();
    expect(
      screen.getByTestId("test-people-detail-image").getAttribute("src")
    ).toBe(`https://robohash.org/${pupilDetail.fullName}.png`);
  });
});
