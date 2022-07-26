import { IPeople } from "./IPeople";
import { IPlanet } from "./IPlanet";

export class PeopleDetailModel {
  firstName: string = "";
  lastName: string = "";
  address: string;

  constructor(people: IPeople, planet: IPlanet) {
    var pupilNames = people && people.name ? people.name.split(" ") : [];

    if (pupilNames.length > 0) {
      this.firstName = pupilNames[0];
      this.lastName =
        pupilNames.length > 1 ? pupilNames[pupilNames.length - 1] : "";
    }

    this.address = planet ? planet.name : "";
  }

  get fullName(): string {
    let name = (this.firstName + ", " + this.lastName).trim();

    if (name.charAt(name.length - 1) === ",") {
      return name.substring(0, name.length - 1);
    }

    return name;
  }
}
