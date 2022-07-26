import _ from "lodash";

import { getPlanets } from "../api/PlanetsAPI";
import { getPeople } from "../api/PeopleAPI";
import { IPlanet } from "../models/IPlanet";
import { PeopleDetailModel } from "../models/PeopleDetailModel";
import { IApiResults } from "../models/IApiResults";

let planets: {
  [key: string]: IPlanet;
} = {};

const getPeopleDetails = async (
  name: string = "",
  page: number = 1,
  successCallback: (pupilDetails: IApiResults<PeopleDetailModel>) => any,
  errorCallback?: (x: any) => any
) => {
  try {
    const pupils = await getPeople(name, Math.ceil(page / 2));

    if (Object.keys(planets).length === 0) {
      const planetResults = await getPlanets();
      planets = _.keyBy(planetResults.results, (x) => x.url);
    }

    const pagedResults = pupils.results.slice(
      page % 2 === 1 ? 0 : 5,
      page % 2 === 1 ? 5 : undefined
    );

    successCallback({
      count: pupils.count,
      results: pagedResults.map(
        (x) => new PeopleDetailModel(x, planets[x.homeworld])
      ),
    });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

const resetPlanetResults = () => (planets = {});

export { getPeopleDetails, resetPlanetResults };
