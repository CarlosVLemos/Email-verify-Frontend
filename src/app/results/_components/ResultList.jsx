import ResultCard from './ResultCard';

const ResultList = ({ results, emailTexts = [] }) => {
  if (!Array.isArray(results)) {
    return null; // Retorna nulo se `results` não for um array
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