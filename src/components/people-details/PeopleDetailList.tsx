import { PeopleDetailModel } from "../../models/PeopleDetailModel";
import CustomPagination from "../custom-pagination/CustomPagination";
import NoResults from "../no-results/NoResults";
import PeopleDetail from "./PeopleDetail";
import "./PeopleDetailList.css";

type PupilListProps = {
  totalCount: number;
  pageNumber: number;
  data: PeopleDetailModel[];
  setNewPageNumber: (newPageNumber: number) => any;
};

function PeopleDetailList({
  pageNumber,
  totalCount,
  data,
  setNewPageNumber,
}: PupilListProps) {
  const getPupilsDisplay = (pupils: PeopleDetailModel[]) => {
    return pupils.map((x) => <PeopleDetail key={x.fullName} people={x} />);
  };

  return (
    <div className="people-details-list" data-testid="test-people-details-list">
      {(!data || data.length === 0) && (
        <NoResults message="No peoples found with the given name." />
      )}

      {data && data.length > 0 && (
        <>
          {getPupilsDisplay(data)}

          <CustomPagination
            currentPageNumber={pageNumber}
            finalPageNumber={Math.ceil(totalCount / 5)}
            setNewPageNumber={setNewPageNumber}
          />
        </>
      )}
    </div>
  );
}

export default PeopleDetailList;
