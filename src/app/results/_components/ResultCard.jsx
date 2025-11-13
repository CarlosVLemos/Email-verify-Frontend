import { useState } from 'react';
import { summarizeEmail } from '../../../app/api/emailClassification/route';

const ResultCard = ({ result, emailText }) => {
  if (!result) return null;

  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState('');

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

  const categoryConfig = {
    'Produtivo': { color: 'bg-green-100 text-green-800 border-green-200', icon: '✓', gradient: 'from-green-50 to-green-100' },
    'Social': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '👥', gradient: 'from-blue-50 to-blue-100' },
    'Improdutivo': { color: 'bg-red-100 text-red-800 border-red-200', icon: '✗', gradient: 'from-red-50 to-red-100' },
  };

  const toneConfig = {
    'Positivo': { color: 'text-green-600', icon: '😊' },
    'Negativo': { color: 'text-red-600', icon: '😟' },
    'Neutro': { color: 'text-gray-600', icon: '😐' },
  };

  const urgencyConfig = {
    'Alta': { color: 'bg-red-100 text-red-700 border-red-300', icon: '🔴' },
    'Média': { color: 'bg-yellow-100 text-yellow-700 border-yellow-300', icon: '🟡' },
    'Baixa': { color: 'bg-green-100 text-green-700 border-green-300', icon: '🟢' },
  };

  const handleGenerateSummary = async () => {
    if (!emailText) {
      setSummaryError('Texto do email não disponível para resumo');
      return;
    }

    // Validação de tamanho mínimo para texto
    if (typeof emailText === 'string' && emailText.length < 100) {
      setSummaryError('O texto deve ter pelo menos 100 caracteres para gerar um resumo útil.');
      return;
    }

    setLoadingSummary(true);
    setSummaryError('');

    try {
      let summaryData;
      
      // Verifica se emailText é um arquivo (File object) ou string
      if (emailText instanceof File) {
        // É um arquivo - cria FormData
        const formData = new FormData();
        formData.append('file', emailText);
        summaryData = await summarizeEmail(formData, 3);
      } else {
        // É texto normal
        summaryData = await summarizeEmail(emailText, 3);
      }
      
      setSummary(summaryData);
    } catch (error) {
      console.error('Erro ao gerar resumo:', error);
      
      // Mensagem de erro mais detalhada
      let errorMessage = 'Erro ao gerar resumo. ';
      
      if (error.response?.status === 400) {
        const fieldErrors = error.response?.data?.field_errors;
        
        // Verifica se há erro específico de tamanho mínimo
        if (fieldErrors?.email_text) {
          errorMessage = fieldErrors.email_text[0] || 'Requisição inválida.';
        } else {
          errorMessage += 'Requisição inválida. Verifique o formato dos dados.';
        }
      } else if (error.response?.status === 500) {
        errorMessage += 'Erro no servidor. Tente novamente mais tarde.';
      } else {
        errorMessage += 'Tente novamente.';
      }
      
      setSummaryError(errorMessage);
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header com Categoria */}
      <div className={`bg-gradient-to-r ${categoryConfig[category]?.gradient || 'from-gray-50 to-gray-100'} px-6 py-4 border-b-2 ${categoryConfig[category]?.color.split(' ')[2] || 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="mr-3 text-3xl">{categoryConfig[category]?.icon}</span>
              {topic}
            </h3>
            <span className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold border-2 ${categoryConfig[category]?.color}`}>
              {category}
            </span>
          </div>
          {confidence !== null && (
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Confiança</p>
              <p className="text-3xl font-bold text-indigo-600">{(confidence * 100).toFixed(0)}%</p>
            </div>
          )}
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Tom</p>
              <p className={`text-lg font-bold ${toneConfig[tone]?.color}`}>
                {tone}
              </p>
            </div>
            <span className="text-2xl">{toneConfig[tone]?.icon}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Urgência</p>
          <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold border-2 ${urgencyConfig[urgency]?.color}`}>
            {urgencyConfig[urgency]?.icon} {urgency}
          </span>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Palavras</p>
          <p className="text-lg font-bold text-gray-800">{word_count}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Processamento</p>
          <p className="text-lg font-bold text-gray-800">{processing_time_ms}ms</p>
        </div>
      </div>

      {/* Remetente */}
      {sender_email && (
        <div className="px-6 py-4 bg-indigo-50 border-t border-indigo-100">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-indigo-600 uppercase tracking-wide font-semibold">Remetente</p>
              <p className="text-sm font-medium text-gray-800">
                {sender_name && `${sender_name} `}
                <span className="text-gray-600">&lt;{sender_email}&gt;</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Resposta Sugerida */}
      <div className="px-6 py-5 border-t border-gray-100">
        <div className="flex items-start">
          <div className="bg-purple-100 p-2 rounded-lg mr-3 mt-1">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-purple-600 uppercase tracking-wide font-semibold mb-2">
              💡 Resposta Sugerida
            </p>
            <p className="text-sm text-gray-700 bg-purple-50 p-4 rounded-xl border border-purple-100 leading-relaxed">
              {suggested_response}
            </p>
          </div>
        </div>
      </div>

      {/* Resumo do Email */}
      <div className="px-6 py-5 bg-gradient-to-r from-cyan-50 to-blue-50 border-t border-cyan-100">
        <div className="flex items-start">
          <div className="bg-cyan-100 p-2 rounded-lg mr-3 mt-1">
            <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-cyan-600 uppercase tracking-wide font-semibold">
                📄 Resumo Executivo
              </p>
              {!summary && (
                <button
                  onClick={handleGenerateSummary}
                  disabled={loadingSummary || (typeof emailText === 'string' && emailText.length < 100)}
                  className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-all duration-200 flex items-center"
                  title={typeof emailText === 'string' && emailText.length < 100 ? 'Texto muito curto (mínimo 100 caracteres)' : 'Gerar resumo'}
                >
                  {loadingSummary ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Gerando...
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Gerar Resumo
                    </>
                  )}
                </button>
              )}
            </div>

            {summaryError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                {summaryError}
              </div>
            )}

            {summary ? (
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-cyan-200">
                  <p className="text-xs text-cyan-600 font-semibold mb-2">Resumo:</p>
                  <ul className="space-y-2">
                    {summary.summary.map((sentence, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="text-cyan-600 mr-2 font-bold">•</span>
                        <span>{sentence}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {summary.key_points && summary.key_points.length > 0 && (
                  <div className="bg-white p-4 rounded-xl border border-cyan-200">
                    <p className="text-xs text-cyan-600 font-semibold mb-2">Pontos-Chave:</p>
                    <ul className="space-y-2">
                      {summary.key_points.map((point, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="text-amber-500 mr-2">🔑</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white p-2 rounded-lg border border-cyan-200 text-center">
                    <p className="text-xs text-gray-500 font-semibold">Relevância</p>
                    <p className="text-sm font-bold text-cyan-600">
                      {(summary.relevance_score * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-cyan-200 text-center">
                    <p className="text-xs text-gray-500 font-semibold">Redução</p>
                    <p className="text-sm font-bold text-cyan-600">
                      {summary.word_reduction.toFixed(0)}%
                    </p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-cyan-200 text-center">
                    <p className="text-xs text-gray-500 font-semibold">Palavras</p>
                    <p className="text-sm font-bold text-cyan-600">
                      {summary.summary_word_count}/{summary.original_word_count}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {!emailText ? (
                  <p className="text-sm text-gray-600 italic">
                    Resumo não disponível (email enviado sem texto/arquivo).
                  </p>
                ) : typeof emailText === 'string' && emailText.length < 100 ? (
                  <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg text-sm">
                    <p className="font-semibold mb-1">⚠️ Texto muito curto</p>
                    <p>Para gerar um resumo útil, o texto deve ter pelo menos 100 caracteres. Atualmente: {emailText.length} caracteres.</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 italic">
                    Clique no botão acima para gerar um resumo executivo deste email.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Análise de Anexos */}
      {attachment_analysis && (
        <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
          <div className="flex items-start">
            <div className="bg-amber-100 p-2 rounded-lg mr-3 mt-1">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-amber-600 uppercase tracking-wide font-semibold mb-3">
                📎 Análise de Anexos
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 font-semibold">Anexos Mencionados</p>
                  <p className="text-sm font-bold text-gray-800">
                    {attachment_analysis.has_attachments_mentioned ? '✓ Sim' : '✗ Não'}
                  </p>
                </div>
                {attachment_analysis.mention_count > 0 && (
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 font-semibold">Menções</p>
                    <p className="text-sm font-bold text-gray-800">{attachment_analysis.mention_count}</p>
                  </div>
                )}
                {attachment_analysis.security_risk_level && (
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 font-semibold">Nível de Risco</p>
                    <span className={`inline-block text-sm font-bold ${
                      attachment_analysis.security_risk_level === 'seguro' ? 'text-green-600' :
                      attachment_analysis.security_risk_level === 'médio' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {attachment_analysis.security_risk_level === 'seguro' ? '🟢' : 
                       attachment_analysis.security_risk_level === 'médio' ? '🟡' : '🔴'} {attachment_analysis.security_risk_level}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer com Estatísticas */}
      <div className="px-6 py-3 bg-gray-100 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>📊 {char_count} caracteres analisados</span>
          <span>⚡ Processado em {processing_time_ms}ms</span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;