"use client";

import FormBatchUpload from '../components/features/forms/FormBatchUpload';
import FormTextSubmit from '../components/features/forms/FormTextSubmit';
import ResultList from './results/_components/ResultList';
import { useState } from 'react';

export default function Home() {
  const [results, setResults] = useState([]); // Garantir que seja um array

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Análise de Emails</h2>

      <FormBatchUpload onSubmit={setResults} />

      <FormTextSubmit onSubmit={setResults} />

      {results.length > 0 && <ResultList results={results} />}
    </div>
  );
}
