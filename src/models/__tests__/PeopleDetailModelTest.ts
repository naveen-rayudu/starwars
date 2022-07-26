import { IPlanet } from "../IPlanet";
import { PeopleDetailModel } from "../PeopleDetailModel";

describe("peopledetailmodel", () => {
  it("should set first and last name when people name has first and last name, ", () => {
    const peopleDetailModel = new PeopleDetailModel(
      { name: "Chuck Norris", homeworld: "s" },
      { name: "Aldrin", url: "s" }
    );

    expect(peopleDetailModel.firstName).toBe("Chuck");
    expect(peopleDetailModel.lastName).toBe("Norris");
    expect(peopleDetailModel.fullName).toBe("Chuck, Norris");
    expect(peopleDetailModel.address).toBe("Aldrin");
  });

  it("should set only first name when people name has no last name", () => {
    const peopleDetailModel = new PeopleDetailModel(
      { name: "Chuck", homeworld: "s" },
      { name: "Aldrin", url: "s" }
    );

    expect(peopleDetailModel.firstName).toBe("Chuck");
    expect(peopleDetailModel.lastName).toBe("");
    expect(peopleDetailModel.fullName).toBe("Chuck");
    expect(peopleDetailModel.address).toBe("Aldrin");
  });

  it("should not set first, last, and full name when people doesnt have name", () => {
    const peopleDetailModel = new PeopleDetailModel(
      { name: "", homeworld: "s" },
      { name: "Aldrin", url: "s" }
    );

    expect(peopleDetailModel.firstName).toBe("");
    expect(peopleDetailModel.lastName).toBe("");
    expect(peopleDetailModel.fullName).toBe("");
    expect(peopleDetailModel.address).toBe("Aldrin");
  });

  it("should not set address when planet does not exist", () => {
    const peopleDetailModel = new PeopleDetailModel(
      { name: "Chuck Norris", homeworld: "s" },
      null as unknown as IPlanet
    );
    expect(peopleDetailModel.address).toBe("");
  });

  it("should not set address when planet name does not exist", () => {
    const peopleDetailModel = new PeopleDetailModel(
      { name: "Chuck Norris", homeworld: "s" },
      { name: "", url: "" }
    );
    expect(peopleDetailModel.address).toBe("");
  });
});

export {};
