import { useState } from 'react';
import { classifyEmail } from '../../../app/api/emailClassification/route';

const FormTextSubmit = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação do texto
    if (text.trim().length < 10 || text.trim().length > 50000) {
      setError('O texto deve ter entre 10 e 50.000 caracteres.');
      return;
    }

    setError(''); // Limpa erros anteriores
    setLoading(true);

    try {
      const result = await classifyEmail(text.trim());
      onSubmit(result);
      setText('');
    } catch (error) {
      console.error('Erro ao enviar texto:', error);
      setError('Erro ao enviar o texto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="textInput" className="block text-sm font-semibold text-gray-700 mb-2">
          Insira o texto do email para análise
        </label>
        <textarea
          id="textInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none hover:border-gray-300"
          rows="6"
          placeholder="Cole aqui o texto do email que deseja analisar..."
          disabled={loading}
        ></textarea>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            {text.length} / 50.000 caracteres
          </p>
          {text.length >= 10 && (
            <p className="text-xs text-green-600 font-medium">
              ✓ Texto válido
            </p>
          )}
        </div>
      </div>

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

      <button
        type="submit"
        disabled={loading || text.trim().length < 10}
        className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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