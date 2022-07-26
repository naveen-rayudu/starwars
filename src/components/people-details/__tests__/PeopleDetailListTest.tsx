import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PeopleDetailList from "../PeopleDetailList";
import { PeopleDetailModel } from "../../../models/PeopleDetailModel";

describe("peopledetaillist", () => {
  it("should load peopledetaillist", async () => {
    const pageNumber = 1;
    const totalCount = 4;
    const data: PeopleDetailModel[] = [
      {
        address: "Address1",
        firstName: "Chuck",
        lastName: "Norris",
        fullName: "Chuck, Norris",
      },
    ];
    const setNewPageNumber = (_: number) => {};

    render(
      <PeopleDetailList
        data={data}
        pageNumber={pageNumber}
        setNewPageNumber={setNewPageNumber}
        totalCount={totalCount}
      />
    );

    expect(
      screen.queryByTestId("test-people-details-list")
    ).toBeInTheDocument();
  });

  it("should show no results message when no people details to show", async () => {
    const pageNumber = 1;
    const totalCount = 4;
    const data: PeopleDetailModel[] = [];
    const setNewPageNumber = (_: number) => {};

    render(
      <PeopleDetailList
        data={data}
        pageNumber={pageNumber}
        setNewPageNumber={setNewPageNumber}
        totalCount={totalCount}
      />
    );

    expect(screen.getByTestId("test-no-results")).toBeInTheDocument();
  });

  it("should show pupil details and pagination when people details exist", async () => {
    const pageNumber = 1;
    const totalCount = 4;
    const data: PeopleDetailModel[] = [
      {
        address: "Address1",
        firstName: "Chuck",
        lastName: "Norris",
        fullName: "Chuck, Norris",
      },
      {
        address: "Address2",
        firstName: "Mike",
        lastName: "Norris",
        fullName: "Mike, Norris",
      },
    ];
    const setNewPageNumber = (_: number) => {};

    render(
      <PeopleDetailList
        data={data}
        pageNumber={pageNumber}
        setNewPageNumber={setNewPageNumber}
        totalCount={totalCount}
      />
    );

    expect(screen.getAllByTestId("test-people-detail").length).toBe(
      data.length
    );
    expect(screen.getByTestId("test-custom-pagination")).toBeInTheDocument();
  });
});
