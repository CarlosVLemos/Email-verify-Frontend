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
        <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Email do Remetente (opcional):
        </label>
        <input
          type="email"
          id="senderEmail"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
          placeholder="exemplo@email.com"
        />
      </div>

      <div>
        <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Nome do Remetente (opcional):
        </label>
        <input
          type="text"
          id="senderName"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
          placeholder="Nome do remetente"
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 dark:bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-dark-800"
      >
        Enviar Detalhes
      </button>
    </form>
  );
};

export default FormSenderDetails;
