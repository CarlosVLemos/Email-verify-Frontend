const ResultCard = ({ category, suggestedResponse }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold text-gray-800">Resultado da Análise</h3>
      <p className="mt-2 text-sm text-gray-600">
        <strong>Categoria:</strong> {category}
      </p>
      <p className="mt-2 text-sm text-gray-600">
        <strong>Resposta Sugerida:</strong> {suggestedResponse}
      </p>
    </div>
  );
};

export default ResultCard;