type NoResultProps = {
  message: string;
};

function NoResults({ message }: NoResultProps) {
  return <div className="noresults-container">{message}</div>;
}

export default NoResults;
