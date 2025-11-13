import { useState } from 'react';
import { classifyEmail } from '../../../app/api/emailClassification/route';

const FormTextSubmit = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação do texto
    if (text.trim().length < 10 || text.trim().length > 50000) {
      setError('O texto deve ter entre 10 e 50.000 caracteres.');
      return;
    }

    setError(''); // Limpa erros anteriores

    try {
      const result = await classifyEmail(text.trim());
      onSubmit(result);
      setText('');
    } catch (error) {
      console.error('Erro ao enviar texto:', error);
      setError('Erro ao enviar o texto. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="textInput" className="block text-sm font-medium text-gray-700">
        Insira o texto para análise
      </label>
      <textarea
        id="textInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        rows="4"
        placeholder="Digite o texto aqui..."
      ></textarea>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Enviar
      </button>
    </form>
  );
};

export default FormTextSubmit;