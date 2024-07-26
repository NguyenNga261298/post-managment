import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import 'antd/dist/reset.css';
import './index.css';

// Tạo một phần tử root
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Tạo root bằng 'createRoot'
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
