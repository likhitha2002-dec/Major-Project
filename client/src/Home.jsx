

import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

function Home() {
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [isMonacoEditor, setIsMonacoEditor] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
        setIsMonacoEditor(true);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container p-4 rounded" style={{ maxWidth: '800px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h2 className="mb-4 text-primary text-center">Home Component</h2>
        <div className="mb-3">
          <input type="file" onChange={handleFileChange} className="form-control-file" />
        </div>
        {fileName && <p className="mb-3 text-success text-center">Selected File: {fileName}</p>}
        {isMonacoEditor && (
          <div>
            <h3 className="mb-3 text-info text-center">Monaco Editor</h3>
            <MonacoEditor
              width="100%"
              height="400"
              language="javascript"
              theme="vs-dark"
              value={fileContent}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
