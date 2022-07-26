import { PeopleDetailModel } from "../../models/PeopleDetailModel";
import "./PeopleDetail.css";

type PeopleDetailProps = {
  people: PeopleDetailModel;
};

function PeopleDetail({ people }: PeopleDetailProps) {
  return (
    <div className="people-detail" data-testid="test-people-detail">
      <div className="image-holder">
        <img
          className="image"
          data-testid="test-people-detail-image"
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
