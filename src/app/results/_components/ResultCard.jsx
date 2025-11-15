import { useState } from 'react';
import { summarizeEmail, generateHuggingFaceResponse } from '@/services/emailService';
import { useApi } from '@/hooks/useApi';
import { CATEGORY_CONFIG, TONE_CONFIG, URGENCY_CONFIG } from '@/lib/constants';
import { formatPercentage } from '@/utils/formatters';
import { validateEmailText, FILE_CONSTRAINTS } from '@/utils/validators';

const ResultCard = ({ result, emailText }) => {
  if (!result) return null;

  const [hfTone, setHfTone] = useState('professional');

  const {
    data: summary,
    loading: loadingSummary,
    error: summaryError,
    execute: executeSummary
  } = useApi(summarizeEmail);

  const {
    data: hfResponse,
    loading: loadingHfResponse,
    error: hfResponseError,
    execute: executeHfResponse
  } = useApi(generateHuggingFaceResponse);

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

  

  const handleGenerateSummary = async () => {
    if (!emailText) {
      return;
    }

    const validationError = validateEmailText(emailText);
    if (validationError) {
      return;
    }

    let summaryData;
    if (emailText instanceof File) {
      const formData = new FormData();
      formData.append('file', emailText);
      summaryData = await executeSummary(formData, 3);
    } else {
      summaryData = await executeSummary(emailText, 3);
    }
  };

  const handleGenerateHfResponse = async () => {
    if (!emailText) {
      return;
    }

    const validationError = validateEmailText(emailText);
    if (validationError) {
      return;
    }

    const context = `Este é um email classificado como ${category} com tom ${tone} e urgência ${urgency}.`;
    await executeHfResponse(emailText, context, hfTone);
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-dark-700 hover:shadow-3xl transition-all duration-300 sm:transform sm:hover:-translate-y-1">
      <div className={`bg-gradient-to-r ${CATEGORY_CONFIG[category]?.gradient || 'from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800'} px-4 sm:px-6 py-3 sm:py-4 border-b-2 ${CATEGORY_CONFIG[category]?.color.split(' ')[2] || 'border-gray-200'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-500 flex items-center">
              <span className="mr-2 sm:mr-3 text-2xl sm:text-3xl flex-shrink-0">{CATEGORY_CONFIG[category]?.icon}</span>
              <span className="truncate">{topic}</span>
            </h3>
            <span className={`inline-block mt-2 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold border-2 ${CATEGORY_CONFIG[category]?.color}`}>
              {category}
            </span>
          </div>
          {confidence !== null && (
            <div className="text-left sm:text-right flex-shrink-0">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Confiança</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary-500">{formatPercentage(confidence, 0)}</p>
            </div>
          )}
        </div>
      </div>

      {}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 dark:bg-dark-900">
        <div className="bg-white dark:bg-dark-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-dark-700">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1 truncate">Tom</p>
              <p className={`text-base sm:text-lg font-bold truncate ${TONE_CONFIG[tone]?.color}`}>
                {tone}
              </p>
            </div>
            <span className="text-xl sm:text-2xl flex-shrink-0 ml-2">{TONE_CONFIG[tone]?.icon}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-dark-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Urgência</p>
          <span className={`inline-block px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-bold border-2 ${URGENCY_CONFIG[urgency]?.color} truncate max-w-full`}>
            {URGENCY_CONFIG[urgency]?.icon} {urgency}
          </span>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-dark-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Palavras</p>
          <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">{word_count}</p>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-dark-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1 truncate">Proc.</p>
          <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">{processing_time_ms}ms</p>
        </div>
      </div>

      {}
      {sender_email && (
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-primary-50 dark:bg-primary-900/20 border-t border-primary-100 dark:border-primary-800/30">
          <div className="flex items-center">
            <div className="bg-primary-100 dark:bg-primary-800/30 p-2 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-primary-600 dark:text-primary-400 uppercase tracking-wide font-semibold">Remetente</p>
              <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white break-words">
                {sender_name && `${sender_name} `}
                <span className="text-gray-600 dark:text-gray-400 break-all">&lt;{sender_email}&gt;</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-100 dark:border-dark-700">
        <div className="flex items-start">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mr-2 sm:mr-3 mt-1 flex-shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-300 uppercase tracking-wide font-semibold mb-2">
              💡 Resposta Sugerida
            </p>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-800 bg-purple-50 dark:bg-purple-900/20 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-100 dark:border-purple-800/30 leading-relaxed break-words">
              {suggested_response}
            </p>
          </div>
        </div>
      </div>

      {}
      <div className="px-6 py-5 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-t border-cyan-100 dark:border-cyan-800/30">
        <div className="flex items-start">
          <div className="bg-cyan-100 dark:bg-cyan-900/30 p-2 rounded-lg mr-3 mt-1">
            <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-cyan-600 dark:text-cyan-900 uppercase tracking-wide font-semibold">
                📄 Resumo Executivo
              </p>
              {!summary && (
                <button
                  onClick={handleGenerateSummary}
                  disabled={loadingSummary || (typeof emailText === 'string' && emailText.length < FILE_CONSTRAINTS.MIN_TEXT_LENGTH)}
                  className="px-4 py-1.5 bg-cyan-600 dark:bg-cyan-700 hover:bg-cyan-700 dark:hover:bg-cyan-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-all duration-200 flex items-center"
                  title={typeof emailText === 'string' && emailText.length < FILE_CONSTRAINTS.MIN_TEXT_LENGTH ? `Texto muito curto (mínimo ${FILE_CONSTRAINTS.MIN_TEXT_LENGTH} caracteres)` : 'Gerar resumo'}
                >
                  {loadingSummary ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg">
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
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg text-sm">
                {summaryError}
              </div>
            )}

            {summary ? (
              <div className="space-y-3">
                <div className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800/30">
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mb-2">Resumo:</p>
                  <ul className="space-y-2">
                    {summary.summary.map((sentence, index) => (
                      <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                        <span className="text-cyan-600 dark:text-cyan-400 mr-2 font-bold">•</span>
                        <span>{sentence}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {summary.key_points && summary.key_points.length > 0 && (
                  <div className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800/30">
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mb-2">Pontos-Chave:</p>
                    <ul className="space-y-2">
                      {summary.key_points.map((point, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                          <span className="text-amber-500 dark:text-amber-400 mr-2">🔑</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white dark:bg-dark-800 p-2 rounded-lg border border-cyan-200 dark:border-cyan-800/30 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Relevância</p>
                      <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                        {formatPercentage(summary.relevance_score, 0)}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-dark-800 p-2 rounded-lg border border-cyan-200 dark:border-cyan-800/30 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Redução</p>
                      <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                        {summary.word_reduction.toFixed(0)}%
                      </p>
                  </div>
                  <div className="bg-white dark:bg-dark-800 p-2 rounded-lg border border-cyan-200 dark:border-cyan-800/30 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Palavras</p>
                    <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                      {summary.summary_word_count}/{summary.original_word_count}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {!emailText ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Resumo não disponível (email enviado sem texto/arquivo).
                  </p>
                ) : typeof emailText === 'string' && emailText.length < FILE_CONSTRAINTS.MIN_TEXT_LENGTH ? (
                  <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/30 px-4 py-3 rounded-lg text-sm">
                    <p className="font-semibold mb-1 text-amber-700 dark:text-amber-300">⚠️ Texto muito curto</p>
                    <p className="text-amber-700 dark:text-amber-300">Para gerar um resumo útil, o texto deve ter pelo menos {FILE_CONSTRAINTS.MIN_TEXT_LENGTH} caracteres. Atualmente: {emailText.length} caracteres.</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Clique no botão acima para gerar um resumo executivo deste email.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {}
      <div className="px-6 py-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-t border-purple-100 dark:border-purple-800/30">
        <div className="flex items-start">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mr-3 mt-1">
            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-purple-600 dark:text-purple-800 uppercase tracking-wide font-semibold">
                🤖 Resposta com IA (Hugging Face)
              </p>
              {!hfResponse && (
                <div className="flex items-center gap-2">
                  <select
                    value={hfTone}
                    onChange={(e) => setHfTone(e.target.value)}
                    className="px-2 py-1 text-xs bg-white dark:bg-dark-800 border border-purple-200 dark:border-purple-800/30 rounded-md text-gray-700 dark:text-gray-300"
                  >
                    <option value="professional">Profissional</option>
                    <option value="friendly">Amigável</option>
                    <option value="formal">Formal</option>
                    <option value="casual">Casual</option>
                  </select>
                  <button
                    onClick={handleGenerateHfResponse}
                    disabled={loadingHfResponse || (typeof emailText === 'string' && emailText.length < FILE_CONSTRAINTS.MIN_TEXT_LENGTH)}
                    className="px-4 py-1.5 bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-all duration-200 flex items-center"
                    title={typeof emailText === 'string' && emailText.length < FILE_CONSTRAINTS.MIN_TEXT_LENGTH ? `Texto muito curto (mínimo ${FILE_CONSTRAINTS.MIN_TEXT_LENGTH} caracteres)` : 'Gerar resposta com IA'}
                  >
                    {loadingHfResponse ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Gerando...
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Gerar Resposta
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {hfResponseError && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg text-sm">
                {hfResponseError}
              </div>
            )}

            {hfResponse ? (
              <div className="space-y-3">
                <div className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-purple-200 dark:border-purple-800/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Resposta Gerada ({hfTone})</p>
                    <button
                      onClick={() => navigator.clipboard.writeText(hfResponse.generated_response)}
                      className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium flex items-center"
                      title="Copiar resposta"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copiar
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {hfResponse.generated_response}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>💡 Resposta gerada por IA baseada no contexto do email</span>
                  {hfResponse.fallback && (
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      🔄 Modo offline
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div>
                {!emailText ? (
                  <p className="text-sm text-gray-600 dark:text-gray-800 italic">
                    Resposta IA não disponível (email enviado sem texto/arquivo).
                  </p>
                ) : typeof emailText === 'string' && emailText.length < FILE_CONSTRAINTS.MIN_TEXT_LENGTH ? (
                  <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/30 px-4 py-3 rounded-lg text-sm">
                    <p className="font-semibold mb-1 text-amber-700 dark:text-amber-300">⚠️ Texto muito curto</p>
                    <p className="text-amber-700 dark:text-amber-300">Para gerar uma resposta útil, o texto deve ter pelo menos {FILE_CONSTRAINTS.MIN_TEXT_LENGTH} caracteres. Atualmente: {emailText.length} caracteres.</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Clique no botão acima para gerar uma resposta automática com IA.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {attachment_analysis && (
        <div className="px-6 py-5 bg-gray-50 dark:bg-dark-900 border-t border-gray-100 dark:border-dark-700">
          <div className="flex items-start">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg mr-3 mt-1">
              <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-amber-600 dark:text-amber-300 uppercase tracking-wide font-semibold mb-3">
                📎 Análise de Anexos
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white dark:bg-dark-800 p-3 rounded-lg border border-gray-200 dark:border-dark-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Anexos Mencionados</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">
                    {attachment_analysis.has_attachments_mentioned ? '✓ Sim' : '✗ Não'}
                  </p>
                </div>
                {attachment_analysis.mention_count > 0 && (
                  <div className="bg-white dark:bg-dark-800 p-3 rounded-lg border border-gray-200 dark:border-dark-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Menções</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{attachment_analysis.mention_count}</p>
                  </div>
                )}
                {attachment_analysis.security_risk_level && (
                  <div className="bg-white dark:bg-dark-800 p-3 rounded-lg border border-gray-200 dark:border-dark-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Nível de Risco</p>
                    <span className={`inline-block text-sm font-bold ${
                      attachment_analysis.security_risk_level === 'seguro' ? 'text-green-600 dark:text-green-400' :
                      attachment_analysis.security_risk_level === 'médio' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
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

      <div className="px-6 py-3 bg-gray-100 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>📊 {char_count} caracteres analisados</span>
          <span>⚡ Processado em {processing_time_ms}ms</span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
