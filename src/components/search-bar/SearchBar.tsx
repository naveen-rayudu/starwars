import { useCallback, useRef } from "react";
import "./SearchBar.css";

type SearchBarProps = {
  tabIndex?: number;
  placeHolder: string;
  value: string;
  onChange: (value: string) => any;
};

function SearchBar({
  placeHolder,
  value,
  onChange,
  tabIndex = 999,
}: SearchBarProps) {
  const searchBoxRef = useRef(null);

  const onClearText = useCallback(() => {
    onChange("");
    searchBoxRef &&
      searchBoxRef.current &&
      (searchBoxRef.current as HTMLElement).focus();
  }, [onChange, searchBoxRef]);

  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <input
        tabIndex={tabIndex}
        value={value}
        type="text"
        placeholder={placeHolder}
        onChange={(inputEle) => onChange(inputEle.currentTarget.value)}
        ref={searchBoxRef}
        data-testid="test-search-bar"
      />
      {value && value.length && (
        <button
          tabIndex={tabIndex}
          onClick={onClearText}
          className="close-button"
          type="button"
          data-testid="test-button"
        >
          &#9447;
        </button>
      )}
    </form>
  );
}

export default SearchBar;
