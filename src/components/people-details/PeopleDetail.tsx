import { PeopleDetailModel } from "../../models/PeopleDetailModel";
import "./PeopleDetail.css";

type PeopleDetailProps = {
  people: PeopleDetailModel;
};

function PeopleDetail({ people }: PeopleDetailProps) {
  return (
    <div className="people-detail">
      <div className="image-holder">
        <img
          className="image"
          src={`https://robohash.org/${people.fullName}.png`}
          alt={people.fullName}
        />
      </div>

      <div className="detail-holder">
        <div className="full-name">{people.fullName}</div>
        <div className="address">{people.address}</div>
      </div>
    </div>
  );
}
export default PeopleDetail;
