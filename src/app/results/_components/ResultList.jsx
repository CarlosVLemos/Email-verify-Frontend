import ResultCard from './ResultCard';

const ResultList = ({ results }) => {
  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <ResultCard
          key={index}
          category={result.category}
          suggestedResponse={result.suggestedResponse}
        />
      ))}
    </div>
  );
};

export default ResultList;