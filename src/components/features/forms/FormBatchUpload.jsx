"use client";

import { useState } from "react";
import { processBatchEmails } from '../../../app/api/emailClassification/route';

const FormBatchUpload = ({ onSubmit }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const emails = await Promise.all(
        files.map(async (file) => {
          const text = await file.text();
          return text;
        })
      );
      const result = await processBatchEmails(emails);
      onSubmit(result.results);
    } catch (error) {
      console.error('Erro ao enviar arquivos:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Enviar Arquivos</button>
    </form>
  );
};

export default FormBatchUpload;