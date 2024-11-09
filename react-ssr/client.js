import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/index';
import { createRoot, hydrateRoot } from 'react-dom/client';

// ssr 模式 会渲染两次
// const root = createRoot(document.getElementById('root'));

// root.render(<App />);

// 使用 hydrateRoot 进行水合 会复用服务端渲染的 html
hydrateRoot(document.getElementById('root'), <App {...window.__DATA__} />);