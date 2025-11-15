"use client";

import { FormTextSubmit, FormBatchUpload } from '@/components/features/forms';
import ResultList from './results/_components/ResultList';
import { useState } from 'react';

export default function Home() {
  const [results, setResults] = useState([]); 
  const [emailTexts, setEmailTexts] = useState([]); 
  const [activeTab, setActiveTab] = useState('single'); 

  const handleSingleResult = (result, emailText) => {
    
    setResults([result]);
    setEmailTexts([emailText]);
  };

  const handleBatchResults = (batchResults, batchTexts = []) => {
    
    setResults(batchResults);
    setEmailTexts(batchTexts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
            📧 Email Intelligence API
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Análise inteligente de emails com IA. Classifique, analise e obtenha insights sobre seus emails.
          </p>
        </div>

        {}
        <div className="bg-white dark:bg-dark-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-dark-700 overflow-hidden mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row border-b border-gray-200 dark:border-dark-700">
            <button
              onClick={() => setActiveTab('single')}
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 text-center font-semibold transition-all duration-200 ${
                activeTab === 'single'
                  ? 'bg-primary-500 text-white border-b-4 border-primary-700'
                  : 'bg-gray-50 dark:bg-dark-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
              }`}
            >
              <div className="flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm sm:text-base">Enviar Email Único</span>
              </div>
              <p className="text-xs mt-1 opacity-75 hidden sm:block">Analise um email por vez (texto ou arquivo)</p>
            </button>

            <button
              onClick={() => setActiveTab('batch')}
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 text-center font-semibold transition-all duration-200 ${
                activeTab === 'batch'
                  ? 'bg-primary-500 text-white border-b-4 border-primary-700'
                  : 'bg-gray-50 dark:bg-dark-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
              }`}
            >
              <div className="flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="text-sm sm:text-base">Enviar em Lote</span>
              </div>
              <p className="text-xs mt-1 opacity-75 hidden sm:block">Analise múltiplos emails de uma vez (arquivo com vários emails)</p>
            </button>
          </div>

          {}
          <div className="p-4 sm:p-6 lg:p-8">
            {activeTab === 'single' && (
              <div className="animate-fadeIn">
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Análise de Email Único
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    Envie um email individual para análise. Você pode digitar o texto diretamente ou fazer upload de um arquivo (.txt, .pdf, .docx).
                  </p>
                </div>
                <FormTextSubmit onSubmit={handleSingleResult} />
              </div>
            )}

            {activeTab === 'batch' && (
              <div className="animate-fadeIn">
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Processamento em Lote
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    Envie um arquivo contendo múltiplos emails para análise simultânea. Formatos aceitos: .txt, .csv, .json (até 50 emails).
                  </p>
                </div>
                <FormBatchUpload onSubmit={handleBatchResults} />
              </div>
            )}
          </div>
        </div>

        {}
        {results.length > 0 && (
          <div className="animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                <span className="bg-primary-500 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-base">
                  ✓
                </span>
                <span className="flex flex-col sm:flex-row sm:items-center">
                  <span>Resultados da Análise</span>
                  <span className="text-base sm:text-lg text-gray-500 dark:text-gray-400 font-normal sm:ml-3 mt-1 sm:mt-0">
                    ({results.length} {results.length === 1 ? 'email' : 'emails'})
                  </span>
                </span>
              </h2>
              <button
                onClick={() => {
                  setResults([]);
                  setEmailTexts([]);
                }}
                className="px-3 sm:px-4 py-2 bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center text-sm sm:text-base whitespace-nowrap"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Limpar Resultados
              </button>
            </div>
            <ResultList results={results} emailTexts={emailTexts} />
          </div>
        )}
      </div>
    </div>
  );
}
