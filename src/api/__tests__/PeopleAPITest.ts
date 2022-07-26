import { getPeople, peoplesAPIURL } from "../PeopleAPI";

describe("pupilsapi", () => {
  it("should calls api with page number 1 when name and page number not passed", async () => {
    const resolveMock = jest.fn();
    const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: resolveMock,
    } as any);

    await getPeople();

    expect(fetchSpy).toBeCalledWith(`${peoplesAPIURL}?page=1`);
    expect(resolveMock).toBeCalled();
  });

  it("should calls api with page number and name when passed", async () => {
    const name = "Chuck";
    const pageNumber = 2;
    const resolveMock = jest.fn();
    const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: resolveMock,
    } as any);

    await getPeople(name, pageNumber);

    expect(fetchSpy).toBeCalledWith(
      `${peoplesAPIURL}?page=${pageNumber}&search=${name}`
    );
    expect(resolveMock).toBeCalled();
  });

  it("should throw error when response is not ok", async () => {
    const name = "Chuck";
    const pageNumber = 2;
    const resolveMock = jest.fn();
    const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      json: () => resolveMock,
    } as any);

    expect(getPeople(name, pageNumber)).rejects.toThrowError();
    expect(resolveMock).not.toBeCalled();
  });
});

export {};
