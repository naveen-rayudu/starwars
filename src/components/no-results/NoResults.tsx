type NoResultProps = {
  message: string;
};

function NoResults({ message }: NoResultProps) {
  return (
    <div data-testid="test-no-results" className="noresults-container">
      {message}
    </div>
  );
}

export default NoResults;
