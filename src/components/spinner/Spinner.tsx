import "./Spinner.css";
function Spinner() {
  return (
    <div className="loader-holder" data-testid="test-loader-holder">
      <div className="loader" data-testid="test-loader"></div>
    </div>
  );
}

export default Spinner;
