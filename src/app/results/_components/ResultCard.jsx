const ResultCard = ({ result }) => {
  if (!result) return null;

  const {
    topic,
    category,
    confidence,
    tone,
    urgency,
    suggested_response,
    attachment_analysis,
    word_count,
    char_count,
    processing_time_ms,
    sender_email,
    sender_name,
  } = result;

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white space-y-4">
      <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">Resultado da Análise</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">
            <strong className="text-gray-800">Tópico:</strong> {topic}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">
            <strong className="text-gray-800">Categoria:</strong>{' '}
            <span className={`font-semibold ${
              category === 'Produtivo' ? 'text-green-600' :
              category === 'Social' ? 'text-blue-600' :
              'text-red-600'
            }`}>
              {category}
            </span>
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">
            <strong className="text-gray-800">Tom:</strong>{' '}
            <span className={`font-semibold ${
              tone === 'Positivo' ? 'text-green-600' :
              tone === 'Negativo' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {tone}
            </span>
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">
            <strong className="text-gray-800">Urgência:</strong>{' '}
            <span className={`font-semibold ${
              urgency === 'Alta' ? 'text-red-600' :
              urgency === 'Média' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {urgency}
            </span>
          </p>
        </div>
        
        {confidence !== null && (
          <div>
            <p className="text-sm text-gray-600">
              <strong className="text-gray-800">Confiança:</strong>{' '}
              {(confidence * 100).toFixed(2)}%
            </p>
          </div>
        )}
        
        <div>
          <p className="text-sm text-gray-600">
            <strong className="text-gray-800">Processamento:</strong> {processing_time_ms}ms
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">
            <strong className="text-gray-800">Palavras:</strong> {word_count}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">
            <strong className="text-gray-800">Caracteres:</strong> {char_count}
          </p>
        </div>
      </div>

      {sender_email && (
        <div className="pt-2">
          <p className="text-sm text-gray-600">
            <strong className="text-gray-800">Remetente:</strong>{' '}
            {sender_name && `${sender_name} `}
            {sender_email && `<${sender_email}>`}
          </p>
        </div>
      )}
      
      <div className="pt-2">
        <p className="text-sm text-gray-800 font-semibold">Resposta Sugerida:</p>
        <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          {suggested_response}
        </p>
      </div>
      
      {attachment_analysis && (
        <div className="pt-2">
          <p className="text-sm text-gray-800 font-semibold">Análise de Anexos:</p>
          <div className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded-md space-y-1">
            <p>
              <strong>Anexos mencionados:</strong>{' '}
              {attachment_analysis.has_attachments_mentioned ? 'Sim' : 'Não'}
            </p>
            {attachment_analysis.mention_count > 0 && (
              <p>
                <strong>Menções:</strong> {attachment_analysis.mention_count}
              </p>
            )}
            {attachment_analysis.security_risk_level && (
              <p>
                <strong>Nível de risco:</strong>{' '}
                <span className={`font-semibold ${
                  attachment_analysis.security_risk_level === 'seguro' ? 'text-green-600' :
                  attachment_analysis.security_risk_level === 'médio' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {attachment_analysis.security_risk_level}
                </span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;