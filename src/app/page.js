"use client";

import FormTextSubmit from '../components/features/forms/FormTextSubmit';
import FormBatchUpload from '../components/features/forms/FormBatchUpload';
import ResultList from './results/_components/ResultList';
import { useState } from 'react';

export default function Home() {
  const [results, setResults] = useState([]); // Array de resultados
  const [emailTexts, setEmailTexts] = useState([]); // Array de textos dos emails
  const [activeTab, setActiveTab] = useState('single'); // 'single' ou 'batch'

  const handleSingleResult = (result, emailText) => {
    // Adiciona um único resultado ao array
    setResults([result]);
    setEmailTexts([emailText]);
  };

  const handleBatchResults = (batchResults, batchTexts = []) => {
    // Para processamento em lote
    setResults(batchResults);
    setEmailTexts(batchTexts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📧 Email Intelligence API
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Análise inteligente de emails com IA. Classifique, analise e obtenha insights sobre seus emails.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('single')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                activeTab === 'single'
                  ? 'bg-indigo-600 text-white border-b-4 border-indigo-700'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Enviar Email Único
              </div>
              <p className="text-xs mt-1 opacity-75">Analise um email por vez (texto ou arquivo)</p>
            </button>

            <button
              onClick={() => setActiveTab('batch')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                activeTab === 'batch'
                  ? 'bg-purple-600 text-white border-b-4 border-purple-700'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Enviar em Lote
              </div>
              <p className="text-xs mt-1 opacity-75">Analise múltiplos emails de uma vez (arquivo com vários emails)</p>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'single' && (
              <div className="animate-fadeIn">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Análise de Email Único
                  </h2>
                  <p className="text-gray-600">
                    Envie um email individual para análise. Você pode digitar o texto diretamente ou fazer upload de um arquivo (.txt, .pdf, .docx).
                  </p>
                </div>
                <FormTextSubmit onSubmit={handleSingleResult} />
              </div>
            )}

            {activeTab === 'batch' && (
              <div className="animate-fadeIn">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Processamento em Lote
                  </h2>
                  <p className="text-gray-600">
                    Envie um arquivo contendo múltiplos emails para análise simultânea. Formatos aceitos: .txt, .csv, .json (até 50 emails).
                  </p>
                </div>
                <FormBatchUpload onSubmit={handleBatchResults} />
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <span className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  ✓
                </span>
                Resultados da Análise
                <span className="ml-3 text-lg text-gray-500 font-normal">
                  ({results.length} {results.length === 1 ? 'email' : 'emails'})
                </span>
              </h2>
              <button
                onClick={() => {
                  setResults([]);
                  setEmailTexts([]);
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200 font-medium flex items-center"
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
