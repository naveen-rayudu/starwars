import { useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";
import "./App.css";
import PeopleDetailList from "./components/people-details/PeopleDetailList";
import SearchBar from "./components/search-bar/SearchBar";
import { IApiResults } from "./models/IApiResults";
import { PeopleDetailModel } from "./models/PeopleDetailModel";
import { getPeopleDetails } from "./services/PeopleService";
import Spinner from "./components/spinner/Spinner";

function App() {
  const [name, setName] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [peopleDetailsList, setPeopleDetailsList] =
    useState<IApiResults<PeopleDetailModel>>();

  const debounceFn = useRef(
    _.debounce(
      (
        name: string,
        pageNumber: number,
        successCallBack: (results: IApiResults<PeopleDetailModel>) => any,
        errorCallBack: (error: any) => any
      ) => {
        setIsLoading(true);
        getPeopleDetails(name, pageNumber, successCallBack, errorCallBack);
      },
      300
    )
  ).current;

  const successCallBack = useCallback(
    (results: IApiResults<PeopleDetailModel>) => {
      setPeopleDetailsList(results);
      setIsLoading(false);
    },
    [setIsLoading, setPeopleDetailsList]
  );

  const errorCallBack = useCallback(
    (error: any) => {
      console.log(error);
      alert("Error occured while fetching results");
      setIsLoading(false);
    },
    [setIsLoading]
  );

  useEffect(() => {
    debounceFn("", 1, successCallBack, errorCallBack);
  }, [debounceFn, successCallBack, errorCallBack]);

  const getPupilResults = useCallback(
    (name: string, newPageNumber: number) => {
      debounceFn(
        name,
        newPageNumber,
        (results) => {
          successCallBack(results);
          setPageNumber(newPageNumber);
        },
        errorCallBack
      );
    },
    [successCallBack, errorCallBack, setPageNumber, debounceFn]
  );

  const setSearchName = useCallback(
    (name: string) => {
      setName(name);
      getPupilResults(name, 1);
    },
    [getPupilResults, setName]
  );

  const setNewPageNumber = useCallback(
    (newPageNumber: number) => {
      getPupilResults(name, newPageNumber);
    },
    [getPupilResults, name]
  );

  return (
    <div className="App">
      <SearchBar
        placeHolder="Search By Name"
        onChange={setSearchName}
        value={name}
      />
      <div className="results-holder">
        {isLoading && <Spinner />}
        {peopleDetailsList && (
          <PeopleDetailList
            pageNumber={pageNumber}
            totalCount={peopleDetailsList.count}
            data={peopleDetailsList.results}
            setNewPageNumber={setNewPageNumber}
          />
        )}
      </div>
    </div>
  );
}

export default App;
