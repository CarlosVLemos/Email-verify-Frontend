"use client";

import FormBatchUpload from '../components/features/forms/FormBatchUpload';
import FormTextSubmit from '../components/features/forms/FormTextSubmit';
import ResultList from './results/_components/ResultList';
import { useState } from 'react';

export default function Home() {
  const [results, setResults] = useState([]); // Array de resultados

  const handleSingleResult = (result) => {
    // Adiciona um único resultado ao array
    setResults([result]);
  };

  const handleBatchResults = (batchResults) => {
    // Para processamento em lote
    setResults(batchResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📧 Email Intelligence API
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Análise inteligente de emails com IA. Classifique, analise e obtenha insights sobre seus emails.
          </p>
        </div>

        {/* Forms Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 ml-3">Análise de Texto</h2>
            </div>
            <FormTextSubmit onSubmit={handleSingleResult} />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 ml-3">Upload em Lote</h2>
            </div>
            <FormBatchUpload onSubmit={handleBatchResults} />
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
              </h2>
              <button
                onClick={() => setResults([])}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
              >
                Limpar Resultados
              </button>
            </div>
            <ResultList results={results} />
          </div>
        )}
      </div>
    </div>
  );
}
