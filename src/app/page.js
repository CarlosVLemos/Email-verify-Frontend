"use client";

import MainLayout from '../components/shared/ui/MainLayout';
import FormBatchUpload from '../components/features/forms/FormBatchUpload';
import ResultList from '../components/shared/ui/ResultList';
import { useState } from 'react';

export default function Home() {
  const [results, setResults] = useState([]);

  const handleEmailSubmit = async (emailData) => {
    // Simulação de envio e resposta
    const mockResult = {
      category: 'Produtivo',
      suggestedResponse: 'Obrigado pelo contato! Vamos resolver seu problema em breve.',
    };
    setResults([mockResult]);
  };

  const handleBatchSubmit = async (files) => {
    // Simulação de envio e resposta para múltiplos arquivos
    const mockResults = files.map((file, index) => ({
      category: 'Improdutivo',
      suggestedResponse: `Arquivo ${file.name} processado com sucesso.`,
    }));
    setResults(mockResults);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Análise de Emails</h2>

        <FormBatchUpload onSubmit={handleBatchSubmit} />

        {results.length > 0 && <ResultList results={results} />}
      </div>
    </MainLayout>
  );
}
