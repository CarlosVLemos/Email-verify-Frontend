"use client";

import { useState, useRef } from "react";
import { processBatchEmails } from '@/services/emailService';
import { formatFileSize } from '@/utils/formatters';
import { validateFiles, FILE_CONSTRAINTS } from '@/utils/validators';
import { showToast } from '@/lib/toast';

const FormBatchUpload = ({ onSubmit }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  const generatePreview = async (file) => {
    try {
      let preview = '';
      
      if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
        const text = await file.text();
        preview = text.substring(0, 200) + (text.length > 200 ? '...' : '');
      } else if (file.type === 'application/json') {
        const text = await file.text();
        const json = JSON.parse(text);
        preview = JSON.stringify(json, null, 2).substring(0, 200) + '...';
      } else {
        preview = 'Preview não disponível para este tipo de arquivo';
      }

      return {
        name: file.name,
        size: file.size,
        type: file.type,
        preview: preview,
        file: file
      };
    } catch (err) {
      return {
        name: file.name,
        size: file.size,
        type: file.type,
        preview: 'Erro ao gerar preview',
        file: file
      };
    }
  };

  const handleFiles = async (fileList) => {
    const fileArray = Array.from(fileList);
    
    
    const validation = validateFiles(fileArray);
    
    if (!validation.valid) {
      setError(validation.errors.join('\n'));
      return;
    }

    setError('');
    setFiles(fileArray);

    
    const previewPromises = fileArray.map(file => generatePreview(file));
    const generatedPreviews = await Promise.all(previewPromises);
    setPreviews(generatedPreviews);
  };

  const handleFileChange = (event) => {
    handleFiles(event.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (files.length === 0) {
      setError('Selecione pelo menos um arquivo');
      showToast.error('Selecione pelo menos um arquivo');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const emails = await Promise.all(
        files.map(async (file) => {
          const text = await file.text();
          return text;
        })
      );
      
      const result = await processBatchEmails(emails);
      onSubmit(result.results, emails);
      
      
      showToast.success(`${files.length} ${files.length === 1 ? 'email processado' : 'emails processados'} com sucesso! 🎉`);
      
      
      setFiles([]);
      setPreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Erro ao enviar arquivos:', error);
      const errorMsg = 'Erro ao processar arquivos. Tente novamente.';
      setError(errorMsg);
      showToast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
          isDragging
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 scale-105'
            : 'border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 hover:border-primary-400 dark:hover:border-primary-600'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".txt,.csv,.pdf,.docx,.json"
          className="hidden"
          id="file-upload-batch"
        />
        
        <label
          htmlFor="file-upload-batch"
          className="cursor-pointer flex flex-col items-center justify-center"
        >
          <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {isDragging ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para selecionar'}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
            Suporta .txt, .csv, .pdf, .docx, .json
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Máx: {FILE_CONSTRAINTS.MAX_BATCH_FILES} arquivos
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              {formatFileSize(FILE_CONSTRAINTS.MAX_SIZE)} por arquivo
            </span>
          </div>
        </label>
      </div>

      {}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800/30 rounded-xl p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">Erro</h4>
              <p className="text-sm text-red-700 dark:text-red-300 whitespace-pre-line">{error}</p>
            </div>
          </div>
        </div>
      )}

      {}
      {previews.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Arquivos Selecionados ({previews.length})
            </h3>
            <button
              type="button"
              onClick={() => {
                setFiles([]);
                setPreviews([]);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
            >
              Limpar Todos
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center flex-1 min-w-0 mr-2">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-3 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white truncate text-sm">
                        {preview.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(preview.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {}
                <div className="bg-gray-50 dark:bg-dark-900 rounded-lg p-3 border border-gray-200 dark:border-dark-700">
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-mono leading-relaxed whitespace-pre-wrap break-words">
                    {preview.preview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading || files.length === 0}
        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center text-lg"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processando {files.length} {files.length === 1 ? 'arquivo' : 'arquivos'}...
          </>
        ) : (
          <>
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Analisar {files.length > 0 ? `${files.length} ${files.length === 1 ? 'Email' : 'Emails'}` : 'Emails'}
          </>
        )}
      </button>

      {}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-xl p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">💡 Dica</h4>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Você pode arrastar múltiplos arquivos de uma vez. Cada arquivo deve conter o texto de um email separado.
              O sistema processará todos os emails simultaneamente para uma análise mais rápida.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBatchUpload;
