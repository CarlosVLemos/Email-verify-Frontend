import { useState } from 'react';
import { classifyEmail } from '@/services/emailService';

const FormTextSubmit = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState('text');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputMode === 'text') {
      if (text.trim().length < 10 || text.trim().length > 50000) {
        setError('O texto deve ter entre 10 e 50.000 caracteres.');
        return;
      }
    } else {
      if (!file) {
        setError('Por favor, selecione um arquivo.');
        return;
      }
    }

    setError(''); 
    setLoading(true);

    try {
      let result;
      let emailTextOrFile;
      
      if (inputMode === 'text') {
        result = await classifyEmail(text.trim());
        emailTextOrFile = text.trim(); 
      } else {
        
        const formData = new FormData();
        formData.append('file', file);
        result = await classifyEmail(formData);
        emailTextOrFile = file; 
      }
      
      onSubmit(result, emailTextOrFile);
      setText('');
      setFile(null);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      setError('Erro ao processar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ['.txt', '.pdf', '.docx'];
      const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
      
      if (!validTypes.includes(fileExtension)) {
        setError('Formato inválido. Use .txt, .pdf ou .docx');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {}
      <div className="flex gap-3 bg-gray-100 dark:bg-dark-900 p-1 rounded-lg">
        <button
          type="button"
          onClick={() => {
            setInputMode('text');
            setFile(null);
            setError('');
          }}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            inputMode === 'text'
              ? 'bg-white dark:bg-dark-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
          }`}
        >
          <span className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Digitar Texto
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setInputMode('file');
            setText('');
            setError('');
          }}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            inputMode === 'file'
              ? 'bg-white dark:bg-dark-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
          }`}
        >
          <span className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload de Arquivo
          </span>
        </button>
      </div>

      {}
      {inputMode === 'text' && (
        <div className="space-y-2">
          <label htmlFor="textInput" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Texto do Email
          </label>
          <textarea
            id="textInput"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-900 dark:text-white rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-200 resize-none hover:border-gray-300 dark:hover:border-dark-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            rows="8"
            placeholder="Cole aqui o texto do email que deseja analisar..."
            disabled={loading}
          ></textarea>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {text.length} / 50.000 caracteres
            </p>
            {text.length >= 10 && (
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                ✓ Texto válido
              </p>
            )}
          </div>
        </div>
      )}

      {}
      {inputMode === 'file' && (
        <div className="space-y-2">
          <label htmlFor="fileInput" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Arquivo do Email
          </label>
          <div className="relative">
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              accept=".txt,.pdf,.docx"
              disabled={loading}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                file
                  ? 'border-green-400 dark:border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-300 dark:border-dark-600 bg-gray-50 dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 hover:border-gray-400 dark:hover:border-dark-500'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {file ? (
                  <>
                    <svg className="w-12 h-12 mb-3 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-semibold text-green-700 dark:text-green-300">{file.name}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">{(file.size / 1024).toFixed(2)} KB</p>
                  </>
                ) : (
                  <>
                    <svg className="w-12 h-12 mb-3 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
                      <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">TXT, PDF ou DOCX (máx. 10MB)</p>
                  </>
                )}
              </div>
            </label>
          </div>
          {file && (
            <button
              type="button"
              onClick={() => {
                setFile(null);
                document.getElementById('fileInput').value = '';
              }}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
            >
              ✗ Remover arquivo
            </button>
          )}
        </div>
      )}

      {}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      {}
      <button
        type="submit"
        disabled={loading || (inputMode === 'text' ? text.trim().length < 10 : !file)}
        className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analisando...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Analisar Email
          </span>
        )}
      </button>
    </form>
  );
};

export default FormTextSubmit;
