import { IApiResults } from "../models/IApiResults";
import { IPlanet } from "../models/IPlanet";

const planetsAPIURL = process.env.REACT_APP_BASE_URL + "planets/";

const getPlanets = (): Promise<IApiResults<IPlanet>> =>
  fetch(planetsAPIURL).then((response) => {
    if (!response.ok) {
      throw new Error("Error occured while fetching results");
    }

    return response.json();
  });

export { getPlanets, planetsAPIURL };
