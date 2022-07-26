import { getPlanets } from "../../api/PlanetsAPI";
import { getPeople } from "../../api/PeopleAPI";
import { getPeopleDetails, resetPlanetResults } from "../PeopleService";
import { IApiResults } from "../../models/IApiResults";
import { IPeople } from "../../models/IPeople";
import { IPlanet } from "../../models/IPlanet";
import { PeopleDetailModel } from "../../models/PeopleDetailModel";

jest.mock("../../api/PlanetsAPI", () => {
  const originalModule = jest.requireActual("../../api/PlanetsAPI");

  return {
    __esModule: true,
    ...originalModule,
    getPlanets: jest.fn(),
  };
});

jest.mock("../../api/PeopleAPI", () => {
  const originalModule = jest.requireActual("../../api/PeopleAPI");
  return {
    __esModule: true,
    ...originalModule,
    getPeople: jest.fn(),
  };
});

describe("peopleservice", () => {
  beforeEach(() => {
    resetPlanetResults();
  });

  it("should call planets and peoples api when called first time", async () => {
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    (getPeople as jest.Mock<any, any>).mockResolvedValueOnce({
      count: 0,
      results: [],
    } as IApiResults<IPeople>);

    (getPlanets as jest.Mock<any, any>).mockResolvedValueOnce({
      count: 1,
      results: [
        {
          name: "planet1",
          url: "planet1",
        },
      ],
    } as IApiResults<IPlanet>);

    await getPeopleDetails("", 1, successCallback, errorCallback);

    expect(getPeople).toBeCalledWith("", 1);
    expect(getPlanets).toBeCalled();
    expect(successCallback).toBeCalled();
  });

  it("should call only peoples api when called after first time", async () => {
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    (getPeople as jest.Mock<any, any>).mockResolvedValue({
      count: 0,
      results: [],
    } as IApiResults<IPeople>);

    (getPlanets as jest.Mock<any, any>).mockResolvedValueOnce({
      count: 1,
      results: [
        {
          name: "planet1",
          url: "planet1",
        },
      ],
    } as IApiResults<IPlanet>);

    await getPeopleDetails("", 1, successCallback, errorCallback);
    await getPeopleDetails("Chuck", 1, successCallback, errorCallback);

    expect(getPeople).toBeCalledWith("", 1);
    expect(getPeople).toBeCalledWith("Chuck", 1);
    expect(getPlanets).toHaveBeenCalledTimes(1);
    expect(successCallback).toBeCalled();
  });

  [1, 2, 3, 4, 5].map((x) => {
    it(`should set page number of ${1} to ${Math.ceil(
      x / 2
    )} to incorporate server paging by 10 results and client paging by 5 results`, async () => {
      const successCallback = jest.fn();
      const errorCallback = jest.fn();

      (getPeople as jest.Mock<any, any>).mockResolvedValue({
        count: 0,
        results: [],
      } as IApiResults<IPeople>);

      (getPlanets as jest.Mock<any, any>).mockResolvedValueOnce({
        count: 1,
        results: [
          {
            name: "planet1",
            url: "planet1",
          },
        ],
      } as IApiResults<IPlanet>);

      await getPeopleDetails("", x, successCallback, errorCallback);

      expect(getPeople).toBeCalledWith("", Math.ceil(x / 2));
      expect(successCallback).toBeCalled();
    });
  });

  it("should call success callback after the apis calls processed", async () => {
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    (getPeople as jest.Mock<any, any>).mockResolvedValueOnce({
      count: 1,
      results: [
        {
          name: "Chuck Norris",
          homeworld: "planet1",
        },
      ],
    } as IApiResults<IPeople>);

    (getPlanets as jest.Mock<any, any>).mockResolvedValueOnce({
      count: 1,
      results: [
        {
          name: "planet1",
          url: "planet1",
        },
      ],
    } as IApiResults<IPlanet>);

    await getPeopleDetails("", 1, successCallback, errorCallback);

    expect(getPeople).toBeCalledWith("", 1);
    expect(getPlanets).toBeCalled();
    expect(successCallback).toHaveBeenCalledWith({
      count: 1,
      results: [
        {
          firstName: "Chuck",
          lastName: "Norris",
          address: "planet1",
        },
      ],
    } as IApiResults<PeopleDetailModel>);
  });

  it("should call error callback when error occured in making api calls", async () => {
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    (getPeople as jest.Mock<any, any>).mockRejectedValue({});

    await getPeopleDetails("", 1, successCallback, errorCallback);
    expect(getPeople).toBeCalledWith("", 1);
    expect(errorCallback).toBeCalled();
  });

  it("should not call error callback when error occured when making api calls and no error callback passed", async () => {
    const successCallback = jest.fn();

    (getPeople as jest.Mock<any, any>).mockRejectedValue({});

    await getPeopleDetails("", 1, successCallback, undefined);
    expect(getPeople).toBeCalledWith("", 1);
    expect(successCallback).not.toBeCalled();
  });
});

export {};
