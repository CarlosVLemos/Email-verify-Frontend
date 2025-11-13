import { useState } from 'react';

const FormSenderDetails = ({ onSubmit }) => {
  const [senderEmail, setSenderEmail] = useState('');
  const [senderName, setSenderName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ senderEmail, senderName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700">
          Email do Remetente (opcional):
        </label>
        <input
          type="email"
          id="senderEmail"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="exemplo@email.com"
        />
      </div>

      <div>
        <label htmlFor="senderName" className="block text-sm font-medium text-gray-700">
          Nome do Remetente (opcional):
        </label>
        <input
          type="text"
          id="senderName"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Nome do remetente"
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Enviar Detalhes
      </button>
    </form>
  );
};

export default FormSenderDetails;