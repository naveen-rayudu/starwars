import { getPlanets, planetsAPIURL } from "../PlanetsAPI";

describe("planetsapi", () => {
  it("should calls api with page number and name when passed", async () => {
    const resolveMock = jest.fn();
    const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: resolveMock,
    } as any);

    await getPlanets();

    expect(fetchSpy).toBeCalledWith(planetsAPIURL);
    expect(resolveMock).toBeCalled();
  });

  it("should throw error when response is not ok", async () => {
    const resolveMock = jest.fn();
    const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      json: () => resolveMock,
    } as any);

    expect(getPlanets).rejects.toThrowError();
    expect(resolveMock).not.toBeCalled();
  });
});

export {};
