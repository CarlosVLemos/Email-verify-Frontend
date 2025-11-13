"use client";

import { useState } from "react";

const FormBatchUpload = ({ onSubmit }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(files);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Enviar Arquivos</button>
    </form>
  );
};

export default FormBatchUpload;