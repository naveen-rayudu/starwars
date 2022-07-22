import { IApiResults } from "../models/IApiResults";
import { IPeople } from "../models/IPeople";

const pupilsAPIURL = process.env.REACT_APP_BASE_URL + "people/";

const getPeople = (
  name: string = "",
  page: Number = 1
): Promise<IApiResults<IPeople>> => {
  let url = `${pupilsAPIURL}?page=${page}`;

  if (name && name.trim()) {
    url = `${url}&search=${name.trim()}`;
  }

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Error occured while fetching results");
    }

    return response.json();
  });
};

export { getPeople };
