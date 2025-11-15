import ResultCard from './ResultCard';

const ResultList = ({ results, emailTexts = [] }) => {
  if (!Array.isArray(results)) {
    return null; 
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <ResultCard
          key={index}
          result={result}
          emailText={emailTexts[index] || null}
        />
      ))}
    </div>
  );
};

export default ResultList;
